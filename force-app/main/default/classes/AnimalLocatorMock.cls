@isTest
global class AnimalLocatorMock implements HttpCalloutMock {
    global HttpResponse respond(HTTPRequest request){
        HttpResponse response = new HttpResponse();
        response.setHeader('Content-Type', 'application/json');
        response.setBody('{"animals": {"Id":1,"name":"cow","eats":"grass"}}');
        response.setStatusCode(200);
        return response;  
    }
}