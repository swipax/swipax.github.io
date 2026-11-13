![Honeypotuma gelen 1.729 bağlantının çoğu sadece 4 IP'den geldi](posts/img/cowrie-honeypot.png)

İnternete açık bir SSH sunucusuna kimler geliyor merak ettim, o yüzden sahte bir tane kurdum. Gerçek sistemlerimle alakası yok, sadece gelenleri kaydediyor.

## Ne kurdum?

Cowrie diye bir honeypot. Dışarıdan normal bir SSH sunucusu gibi görünüyor. Biri bağlanıp şifre denediğinde hepsini loglayabiliyorum. Türkiye'deki sunucumda çalışıyor.

## Ne çıktı?

1.729 bağlantı geldi ama sadece 45 farklı IP'den. 4 IP bağlantıların yaklaşık %61'ini yapmış, yani gelenlerin çoğu aynı birkaç kaynak.

Bağlananların %97'si Go ile yazılmış botlar. Karşıda biri oturup tek tek denemiyor, otomatik tarayıcılar geziyor. Bir bağlantı ortalama 2 saniye sürüyor: gel, bir şifre dene, git.

En çok denenen kullanıcı adı `root` (309 kez), en çok denenen şifre `123456` (217 kez). Sürpriz yok.

## Solana kısmı ilginç

`root`'tan sonra en çok `sol`, `solana` ve `solv` denenmiş. Toplam 285 deneme ve hepsi sadece 4 IP'den gelmiş. Solana sunucuları genelde `sol` kullanıcısıyla kuruluyormuş, o yüzden biri kripto sunucularını avlıyor olabilir. Bu benim tahminim, emin değilim.

Bir de şu var: iki farklı IP neredeyse birebir aynı kalıpla gelmiş. İkisi de 258 deneme yapmış, 149 farklı kullanıcı adı denemiş. Aynı araç, aynı liste olabilir.

## Sen ne yapmalısın?

SSH'i dışarı açıyorsan şifre yerine anahtar kullan, root girişini kapat, fail2ban gibi bir şeyle sürekli deneyen IP'leri engelle.

Bu tek bir sunucudan küçük bir örnek, ülke dağılımına bakmadım.
