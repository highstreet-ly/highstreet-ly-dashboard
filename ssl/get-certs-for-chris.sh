kubectl get secret crt-shop.sonashop.xyz -n sonashop-xyz -o json | jq '.data["tls.crt"]' | tr -d '"' | base64 -d  > ssl/chris/server.crt
kubectl get secret crt-shop.sonashop.xyz -n sonashop-xyz -o json | jq '.data["tls.key"]' | tr -d '"' | base64 -d  > ssl/chris/server.key
