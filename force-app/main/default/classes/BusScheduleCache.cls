public class BusScheduleCache {

   private Cache.OrgPartition part;
   
    public BusSchedulecache(){
        Cache.OrgPartition  intipart = new Cache.OrgPartition('local.BusSchedule'); 
        if (intipart != null) {
                            part = intipart;
                             }
                }
    
    public void putSchedule(String busLine, Time[] schedule){
        if (part != null){
                part.put(busline,schedule);
        }
     }
    
    Public Time[] getSchedule(String busLine){
        Time[] bsched = new Time[]{};
        if (part != null  && (Time[])part.get(busLine) != null){
            bsched = (Time[])part.get(busLine);
            }
        else 
        {
            bsched.add(Time.newInstance(8,0,0,0));
            bsched.add(Time.newInstance(17,0,0,0));
        }
 
         return bsched;
    }
}