global class webhookTest {
    
    global void sendRequest(){
        string OTaccessToken;
        string authorizationHeader;
        //get the AccessToken
        webhookReqRes.webhookResponse getAT = getAccessToken();
        
        OTaccessToken = getAT.AccessToken;
        authorizationHeader = 'Bearer ' + OTaccessToken;
        
        //Set the Body
        webhookReqRes.webhookReqBody genrateReq = new webhookReqRes.webhookReqBody();
        genrateReq.Email = 'riesbecc@oclc.org';
        genrateReq.Language = 'English';
        
        string webHookRequest = JSON.serialize(genrateReq);
        
        
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://app.onetrust.com/integrationmanager/api/v1/webhook/a68554e0-c95e-44ac-bc30-5615a5071fd3');
        request.setMethod('POST');
        request.setBody(webHookRequest);
        request.setHeader('Content-Type','application/json');
        request.setHeader('Authorization',authorizationHeader); 
        request.setHeader('Accept','application/json');
        request.setHeader('Scope','INTEGRATIONS');
        
        HttpResponse response = http.send(request);
        System.debug('The status code returned ' + response + '     '+ response.getStatusCode() + ' ====>' + response.getStatus());
        string responseBody = response.getBody();
    }
    
    
    global webhookReqRes.webhookResponse getAccessToken(){
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://app.onetrust.com/api/access/v1/oauth/token');
        request.setMethod('POST');
        request.setHeader('Client_ID','c13bf265b82341ce964adccf7b233b8d');
        request.setHeader('Client_Secret','8NaGmHi6MMX6O5VjPsXGI8XZZT1W5j1M'); 
        request.setHeader('Content-Type','application/x-www-form-urlencoded');
        HttpResponse response = http.send(request);
        System.debug('The status code returned ' + response + '     '+ response.getStatusCode() + ' ====>' + response.getStatus());
        string responseBody = response.getBody();
        System.debug('responseBody===>' + responseBody);
        
        webhookReqRes.webhookResponse getResponse =  new webhookReqRes.webhookResponse();
        getResponse = (webhookReqRes.webhookResponse) System.JSON.deserialize(response.getBody(), webhookReqRes.webhookResponse.class);
        return getResponse;
    }
    
    
    
}