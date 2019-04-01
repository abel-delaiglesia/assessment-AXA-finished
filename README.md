assessment-AXA.git
===================

The project aims to present how to make an assessment for AXA 

this project have this URL:

 http://localhost:3000 +  next values

    First you must logon,.., that is user and password the same:

   First      + /login?username=[username]&password=[username]	

• Get user data filtered by user id -> Can be accessed by users with role "users" and "admin"

   Second     + '/SelectDataFromId/:id' 
   
	          // example: 'SelectDataFromId/a0ece5db-cd14-4f21-812f-966633e7be86'
	
• Get user data filtered by user name -> Can be accessed by users with role "users" and "admin"
        
	Thirth	+ '/SelectDataFromName/:name' 
   
         // example: 'SelectDataFromName/Britney'
   
• Get the list of policies linked to a user name -> Can be accessed by users with role "admin"

   Fourth       + '/electListOfpoliciesFromUserName/:name'
   

• Get the user linked to a policy number -> Can be accessed by users with role "admin"

  
   Five        + '/SelecUserNameLinkedToPilicy/:PolicyId'
   
         // 'SelecUserNameLinkedToPilicy/0039b246-5ffa-4b90-b16f-fc9f2d4033d6'
    
	
   please make every test and see whats the result.
  

