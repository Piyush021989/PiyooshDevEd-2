@RestResource(urlMapping='/Account/*')
global with sharing class GetAccountREST {
  @HttpGet 
    global static Account getRecord(){
        return null;
    }
    
}