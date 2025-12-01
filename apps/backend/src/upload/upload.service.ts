import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import * as qiniu from "qiniu";

@Injectable()
export class UploadService {
  private mac: qiniu.auth.digest.Mac;
  constructor(private configService: ConfigService) {
    const accessKey = this.configService.get<string>("QINIU_ACCESS_KEY");
    const secretKey = this.configService.get<string>("QINIU_SECRET_KEY");
    this.mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  }
  getCertificate() {
    const options = {
      scope: this.configService.get("QINIU_BUCKET"),
      expires: 3600,
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(this.mac);
    return uploadToken;
  }
}
