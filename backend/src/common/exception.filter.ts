import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    // 明确类型避免 any
    const response: { status: (code: number) => { json: (body: any) => void } } = ctx.getResponse();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "服务器内部错误";
    let code = -1;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === "string") {
        message = res;
        code = status;
      } else if (typeof res === "object" && res && Object.prototype.hasOwnProperty.call(res, "message")) {
        // message 可能为 string 或 string[]
        const msg = (res as Record<string, unknown>)["message"];
        if (Array.isArray(msg)) {
          message = msg.join(", ");
        } else {
          message = String(msg);
        }
        code = status;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    response.status(status).json({
      code,
      message,
      data: null,
    });
  }
}
