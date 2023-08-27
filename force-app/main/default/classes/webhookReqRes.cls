global class webhookReqRes {
    
    global class webhookResponse{
		global string AccessToken			   {get;set;}
		global string timeOut		           {get;set;}
		global string xyz                     {get;set;}
	}
    
    global class webhookReqBody{
        global string Email   			      {get;set;}
        global string Language		           {get;set;}
    }

}