# generated by Neptune Namespaces v1.x.x
# file: art/foundation/StandardLib/index.coffee

module.exports = require './namespace'
.includeInNamespace require './StandardLib'
.addModules
  ArrayExtensions:    require './ArrayExtensions'   
  AsyncExtensions:    require './AsyncExtensions'   
  CallStack:          require './CallStack'         
  Clone:              require './Clone'             
  CommonJs:           require './CommonJs'          
  Eq:                 require './Eq'                
  Function:           require './Function'          
  Log:                require './Log'               
  Map:                require './Map'               
  Math:               require './Math'              
  MinimalBaseObject:  require './MinimalBaseObject' 
  ObjectDiff:         require './ObjectDiff'        
  ObjectExtensions:   require './ObjectExtensions'  
  ParseUrl:           require './ParseUrl'          
  Promise:            require './Promise'           
  PromisedFileReader: require './PromisedFileReader'
  Regexp:             require './Regexp'            
  Ruby:               require './Ruby'              
  ShallowClone:       require './ShallowClone'      
  StringExtensions:   require './StringExtensions'  
  Time:               require './Time'              
  Types:              require './Types'             
  Unique:             require './Unique'            
require './Inspect'