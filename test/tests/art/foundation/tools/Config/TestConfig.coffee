{merge, w, ConfigRegistry, Config, defineModule} = Neptune.Art.Foundation

defineModule module, class TestConfig extends Config
  propA:    "propAFromTestConfig"
