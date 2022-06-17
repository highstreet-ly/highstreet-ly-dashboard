import Service from '@ember/service';
import { inject as service } from '@ember/service';
import Env from 'sonaticket-dashboard/config/environment';
import signalR from "@microsoft/signalr";

export default class SonaticketSignalrService extends Service {

    @service
    eventBus;

    @service
    notifications;

    connection
    eventOrganiserId

    async initialize(eventOrganiserId) {
        return
        this.eventOrganiserId = eventOrganiserId

        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(`${Env.sonatribe.DashApi}/connection`)
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Information)
            .build();

        this.connection.onreconnecting(error => {
            console.assert(this.connection.state === signalR.HubConnectionState.Reconnecting);

            document.getElementById("messageInput").disabled = true;

            const li = document.createElement("li");
            li.textContent = `Connection lost due to error "${error}". Reconnecting.`;
            //document.getElementById("messagesList").appendChild(li);
        });

        this.connection.onreconnected(connectionId => {
            console.assert(this.connection.state === signalR.HubConnectionState.Connected);

            document.getElementById("messageInput").disabled = false;

            const li = document.createElement("li");
            li.textContent = `Connection reestablished. Connected with connectionId "${connectionId}".`;
            //document.getElementById("messagesList").appendChild(li);
        });

        this.connection.onclose(async error => {
            console.assert(this.connection.state === signalR.HubConnectionState.Disconnected);

            document.getElementById("messageInput").disabled = true;

            const li = document.createElement("li");
            li.textContent = `Connection closed due to error "${error}". Try refreshing this page to restart the connection.`;
            //document.getElementById("messagesList").appendChild(li);

            await this.start();
        });

        var lockResolver;
        if (navigator && navigator.locks && navigator.locks.request) {
            const promise = new Promise((res) => {
                lockResolver = res;
            });

            navigator.locks.request('unique_lock_name', { mode: "shared" }, () => {
                return promise;
            });
        }

        this.connection.on('broadcastMessage', (name, m) => {

            var message = JSON.parse(m)

            console.log(`recieved message: ${m}`)

            if (message.Status === "order-confirmed") {
                var audio = new Audio("/sounds/alert.mp3")
                audio.play()

                this.notifications.success(`New order placed`, { autoClear: true });
            }

            this.eventBus.publish(message.Status, message);
        });

        await this.start();
    }

    async start() {
        try {
            await this.connection.start()

            console.assert(this.connection.state === signalR.HubConnectionState.Connected);
            console.log("SignalR Connected.");

            console.log("Connected, transport = " + this.connection.connection.transport.name);
            this.connection.invoke("JoinGroup", this.eventOrganiserId)  //JoinGroup is C# method name
                .catch(err => {
                    console.log(err);
                });

            console.log('connection started');

        } catch (err) {
            console.assert(this.connection.state === signalR.HubConnectionState.Disconnected);
            console.log(err);
            setTimeout(() => this.start(), 5000);
        }
    }
}
