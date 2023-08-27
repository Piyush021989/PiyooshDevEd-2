@istest
private class AnimalLocatorTest {
    @istest Static void AnimalLocatorMock1(){
            Test.setMock(HttpCalloutMock.Class, new AnimalLocatorMock());
            String result = AnimalLocator.getAnimalNameById(1);
            string expectedresult = 'Cow';
            system.assertEquals(result, expectedresult);
        
    }
}