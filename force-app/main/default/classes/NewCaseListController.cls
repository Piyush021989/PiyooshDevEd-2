public class NewCaseListController {
    
    public List<Case> getNewCases(){
        List<CAse> listOfCase = Database.query('Select Id, Casenumber from Case Where Status = \'New\'');
        return listOfCase;
    }
}