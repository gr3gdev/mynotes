# Server
openssl req -x509 -newkey rsa:4096 -keyout server_key.pem -out server_cert.pem -nodes -days 365 -subj "/CN=localhost/O=Client\ Certificate\ Demo"

# Client
openssl req -newkey rsa:4096 -keyout greg_key.pem -out greg_csr.pem -nodes -days 365 -subj "/CN=Greg"
# Signed
openssl x509 -req -in greg_csr.pem -CA server_cert.pem -CAkey server_key.pem -out greg_cert.pem -set_serial 01 -days 365
# For navigator
openssl pkcs12 -export -clcerts -in greg_cert.pem -inkey greg_key.pem -out greg.p12
