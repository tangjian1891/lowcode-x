import { Controller, Get } from "@nestjs/common";
import { UploadService } from "./upload.service";

@Controller("upload")
export class UploadController {
  constructor(private uploadService: UploadService) {}
  @Get("certificate")
  getCertificate() {
    return this.uploadService.getCertificate();
  }
}
