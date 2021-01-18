# Kubernetes Load Balancer

<p align="center">
    <img src="images/image2.png">
</p>

### Deskripsi Deployment
- IP address akses: 34.101.155.211 <br />
- Pod kubernetes: auth, dan user <br />
- Load balancer: ingress nginx <br />
- Region server/vps: Asia-southeast2 <br />
- dokumentasi pod: 
     - <b>34.101.155.211/api/auth/docs</b>
     - <b>34.101.155.211/api/users/docs</b> (perhatikan beberapa suffixes pada akhir endpoint yang harus didelete)
- lokasi script (.yaml): /infra/k8s

Koreksi sedikit: di docs auth signup (role user) masukan field role: 0 (lupa mencantumkan, jadi username, password, dan role (yg sama dengan 0))

### Contoh penggunaan sederhana
Kredensial role admin: 
 - username: test@test.com
 - password: password 

Lakukan POST request ke 34.101.155.211/api/auth/signin (memasukan kredensial dalam bentuk json) (memasukan session user)
<br />
Melakukan akses crud users: Lakukan GET request ke 34.101.155.211/api/users
<br />
<br />
<br />
<p align="center">
<!--     <img src="images/image1.png"> -->
</p>
