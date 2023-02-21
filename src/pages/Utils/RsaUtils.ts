import JSEncrypt from 'jsencrypt';

const PRIV_KEY = '';

const PUB_KEY = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCBOzCpdkNjG2gQd+V/LqDbiMp+dd86SucxxlTmGhX8+couJfXydXJ5UkROkHFRtIPIV6CrrEJQkte/scGFIzic+hQWWl2g5UgV0i+Eqm2X6zUHuOOv3VOMlPOK0OAUOLiuqTS/Z212XLY3I2hG/MOLpKF3S36rVlMqP+FUMp4w6QIDAQAB';


const RsaUtil = () => {

  // 公钥加密
  function encrypt(text:object) {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(PUB_KEY);
    const encrypted = encrypt.encrypt(text.toString());
    return encrypted;
  }

// 私钥解密
  function decrypt(text:object) {
    const decrypt = new JSEncrypt();
    decrypt.setPrivateKey(PRIV_KEY);
    const decrypted = decrypt.decrypt(text.toString());
    return decrypted;
  }
}



export default RsaUtil;
