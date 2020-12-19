import winston from 'winston'
import {Request} from 'express'
import path from 'path'

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename:path.resolve() + '/combined.log'})
    ]
});

export const simpleErrorLogger = (request: Request, error: any)=>{    
  logger.info(`Error: ${request.method}, error: ${error}`)
}

export const unhandledErrorLogger = (error: {} | null | undefined, promise?: Promise<any>)=>{  
  if(promise){
    logger.info(`Unhandled Rejection at Promise: ${promise}, error: ${error}`)
  }  else {
    logger.info(`Uncaught Exception thrown: ${error}`)
  }
}

export const routeLogger = (func: any) =>async (req: any, res: any) => {
  try {
      console.time()
      await func(req, res, logger);
      console.timeEnd()
  } catch(e){
      logger.info(`Error: ${e}`);
  }
};

export function serviceMethodLogger(){
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) {
      const targetMethod = descriptor.value
      descriptor.value = function(...args: any[]){
        logger.info(`Method: ${propertyKey}, agruments: ${args}`)
        return targetMethod.apply(this, args)
      }
    };
  }