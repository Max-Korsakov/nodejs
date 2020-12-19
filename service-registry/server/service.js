const express = require('express');
const ServiceRegistry = require('./lib/ServiceRegistry')

const service = express()

module.exports = (config)=>{
    const log = config.log();

    const serviceRegistry = new ServiceRegistry(log)

    if(service.get('env') === 'development'){
        service.use((req,res,next)=>{
            return next()
        })
    }

    service.put('/register/:servicename/:serviceversion/:serviceport', (req,res)=>{
        console.log('register')
       const {servicename, serviceversion, serviceport } = req.params;

       const serviceip = req.connection.remoteAddress.includes('::') ? `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;

       const serviceKey = serviceRegistry.register(servicename, serviceversion, serviceip, serviceport)
       return res.json({result: serviceKey})
    })

    service.delete('/register/:servicename/:serviceversion/:serviceport', (req,res)=>{
        const {servicename, serviceversion, serviceport } = req.params;

        const serviceip = req.connection.remoteAddress.includes('::') ? `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;
 
        const serviceKey = serviceRegistry.unregister(servicename, serviceversion, serviceip, serviceport)
        return res.json({result: serviceKey})
    })

    service.get('/find/:servicename/:serviceversion', (req,res,next)=>{
        const { servicename, serviceversion } = req.params;
        const svc = serviceRegistry.get(servicename, serviceversion);
        console.log(svc)
        if(!svc) return res.status(404).json({result: 'Service not found'});
        return res.json(svc)
    })

    service.use((error, req,res,next)=>{
        res.status(error.status || 500);
        return res.json({
            error: {
                message: error.message,
            }
        })
    })

    return service
}