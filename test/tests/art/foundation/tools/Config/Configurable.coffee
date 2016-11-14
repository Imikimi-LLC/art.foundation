{merge, w, ConfigRegistry, Configurable, defineModule} = Neptune.Art.Foundation

expectedPath = w "Tests Art Foundation Tools Config"
pathedConfig = Tests: Art: Foundation: Tools: Config: foo: 1

defineModule module, class TestConfigurable extends Configurable
  @defaults
    name:     "TestName"
    verbose:  false

  @configured: -> @config.configured = true

  @suite: ->
    test "TestConfigurable.getConfigurationPath", ->
      assert.eq TestConfigurable.getConfigurationPath(), expectedPath

    test "TestConfigurable.getPathedConfiguration - not found", ->
      assert.eq undefined,
        TestConfigurable.getPathedConfiguration
          Tests: foo: 1

    test "TestConfigurable.getPathedConfiguration - found", ->
      assert.eq
        foo: 1
        TestConfigurable.getPathedConfiguration pathedConfig


    test "TestConfigurable.preprocessConfig", ->
      assert.eq
        foo: 1
        verbose: true
        TestConfigurable.preprocessConfig merge
          verbose: true
          pathedConfig

    test "TestConfigurable.reset()", ->
      configBefore = TestConfigurable.config
      TestConfigurable.config.shouldBeDeleted = "bam!"
      TestConfigurable.reset()
      assert.eq TestConfigurable.config,
        name: "TestName"
        verbose: false

      # same object
      assert.equal configBefore, TestConfigurable.config

    test "ConfigRegistry.configure", ->
      TestConfigurable.reset()

      ConfigRegistry.configure merge
        verbose: true
        novelProp: "cool"
        pathedConfig

      assert.eq TestConfigurable.config,
        name: "TestName"
        novelProp: "cool"
        foo: 1
        verbose: true
        configured: true
