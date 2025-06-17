import { Injectable } from "@nestjs/common";

import * as qiniu from "qiniu";
const accessKey = "nejkG0NQILzClzh2vygYxpvi1KTdoX7SqkYVqc47";
const secretKey = "x299v2rOxAWnH7G2xURSfbNQg8JyCvNYyaVFX6Ql";
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
@Injectable()
export class UploadService {
  getCertificate() {
    const options = {
      scope: "jas-table-oss",
      expires: 3600,
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    return uploadToken;
  }
}
