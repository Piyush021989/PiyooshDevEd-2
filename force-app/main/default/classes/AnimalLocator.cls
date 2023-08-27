public class AnimalLocator {
 public static string getAnimalNameById(Integer Id){
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.SetEndPoint('https://th-apex-http-callout.herokuapp.com/animals/' + Id);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        String StrResp = '';
        system.debug('**********Response===>' + response.getStatusCode());
        system.debug('**********Response===>' + response.getBody());
        if (response.getStatusCode() == 200)
        {
          Map<String, Object> results = (Map<String,Object>)  JSON.deserializeUntyped(response.getBody());
          Map<string,Object> animals =  (Map<String,Object>)   results.get('animal');
          system.debug('Received the following animal:' +animals);
          StrResp = string.valueOf(animals.get('name'));
          system.debug('StrResp >>>' + StrResp);
        }
        return StrResp;
      }
    }