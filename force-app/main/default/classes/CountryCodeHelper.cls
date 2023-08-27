public class CountryCodeHelper {
  public static String getCountryCode(String country) {
    Country_Code__mdt ccmdt =  Country_Code__mdt.getInstance(country);  
    
    return ccmdt.Country_Code__c;
  }
}