public class RandomContactFactory {
    public static List<Contact> generateRandomContacts(Integer numContacts, String ContactLastname) {
        List<Contact> cont1=new List<Contact>();
        for(Integer i=0;i<numContacts;i++) {
            Contact a = new Contact(FirstName='First' + i,LastName=ContactLastname);
            Cont1.add(a);
        }   
        Return cont1;
    }
}