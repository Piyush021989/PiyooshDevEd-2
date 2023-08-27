public class ContactSearch {
    
    public static List<Contact> searchForContacts(string lastName, String Postalcode){
        
        list<contact> con = new List<contact>();
            
        Con=[select Id, Name from contact where LastName=:lastName AND MailingPostalCode =:Postalcode];
        
       return con;
    }

}