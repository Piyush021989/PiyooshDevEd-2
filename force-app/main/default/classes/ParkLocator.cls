public class ParkLocator {
    Public static string[] country(String Country){
      
        ParkService.ParksImplPort park = new ParkService.ParksImplPort();

        String[] ParksName = Park.byCountry(Country);
        return ParksName;
    
    }
}