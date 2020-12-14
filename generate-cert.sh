# Server
openssl req -x509 -newkey rsa:4096 -keyout server_key.pem -out server_cert.pem -nodes -days 365 -subj "/CN=localhost/O=Client\ Certificate\ Demo"

# Client
openssl req -newkey rsa:4096 -keyout demo_key.pem -out demo_csr.pem -nodes -days 365 -subj "/CN=Démo"
# Signed
openssl x509 -req -in demo_csr.pem -CA server_cert.pem -CAkey server_key.pem -out demo_cert.pem -set_serial 01 -days 365
# For navigator
openssl pkcs12 -export -clcerts -in demo_cert.pem -inkey demo_key.pem -out demo.p12
