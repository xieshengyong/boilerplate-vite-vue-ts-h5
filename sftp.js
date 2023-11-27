/*
 * @Author: xieshengyong
 * @Date: 2021-12-16 19:45:23
 * @LastEditTime: 2023-06-07 15:36:53
 * @LastEditors: xieshengyong
 */
let fs = require('fs');
let Client = require('ssh2-sftp-client');
let sftp = new Client();

sftp.connect({
    host: '0.0.0.0',
    port: '22',
    username: 'www',
    privateKey: fs.readFileSync('../id_rsa')
}).then(() => {
    return sftp.uploadDir('dist', '/developmemt/xxx.xx.xx');
}).then(data => {
    console.log('sftp 上传成功：', data);
}).catch(err => {
    console.log(err, 'catch error');
}).finally(() => {
    sftp.end();
});
