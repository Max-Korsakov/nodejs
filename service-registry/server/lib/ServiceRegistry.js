const semver = require('semver');

class ServiceRegistry {
  constructor(log) {
    this.log = log;
    this.service = {};
    this.timeout = 30;
  }

  get(name, version) {
    this.cleanup();
    const condidates = Object.values(this.service)
      .filter(service => service.name === name && semver.satisfies(service.version, version));
    return condidates[Math.floor(Math.random() * condidates.length)];
  }

  register(name, version, ip, port) {
    this.cleanup();
    const key = name + version + ip + port;

    if (!this.service[key]) {
      this.service[key] = {};
      this.service[key].timestamp = Math.floor(new Date() / 1000);
      this.service[key].ip = ip;
      this.service[key].port = port;
      this.service[key].name = name;
      this.service[key].version = version;
      this.log.info(`Added service ${name}, version ${version} at ${ip}:${port}`);
      return key;
    }
    this.service[key].timestamp = Math.floor(new Date() / 1000);
    this.log.info(`Updated service ${name}, version ${version} at ${ip}:${port}`);
    return key;
  }

  unregister(name, version, ip, port) {
    const key = name + version + ip + port;
    this.log.info(`Unregistered service ${name}, version ${version} at ${ip}:${port}`);
    delete this.service[key];
    return key;
  }

  cleanup() {
    const now = Math.floor(new Date() / 1000);
    Object.keys(this.service).forEach((key) => {
      if (this.service[key].timestamp + this.timeout < now) {
        delete this.service[key];
        this.log.info(`Removed service ${key}`);
      }
    });
  }
}

module.exports = ServiceRegistry;
