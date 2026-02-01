import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@prisma/client';

type PrismaMeta = {
  target?: string[];
  driverAdapterError?: {
    cause?: {
      constraint?: {
        fields?: string[];
      };
    };
  };
};

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter<Prisma.PrismaClientKnownRequestError> {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Database error';

    switch (exception.code) {
      case 'P2002': {
        const meta = exception.meta as PrismaMeta;

        const fields = meta?.target ?? meta?.driverAdapterError?.cause?.constraint?.fields ?? [];

        const fieldName = fields.length ? fields.join(', ') : 'Field';

        status = HttpStatus.CONFLICT;
        message = `${fieldName} already exists`;
        break;
      }

      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        message = 'Record not found';
        break;

      case 'P2003':
        status = HttpStatus.BAD_REQUEST;
        message = 'Invalid reference to related record';
        break;

      default:
        message = exception.message;
    }

    res.status(status).json({
      statusCode: status,
      message,
      error: 'Prisma Error',
    });
  }
}
