public class AgentContributionArticleController {
// The constructor must take a ApexPages.KnowledgeArticleVersionStandardControlleras an argument
public
AgentContributionArticleController(ApexPages.KnowledgeArticleVersionStandardController
ctl) {
SObject article = ctl.getRecord(); //this is the SObject for the new article.
//It can optionally be cast to the proper article type, e.g. FAQ__kav article = (FAQ__kav) ctl.getRecord();
String sourceId = ctl.getSourceId(); //this returns the id of the case that was closed.
Case c = [select subject, description from Case where id=:sourceId];
article.put('title', 'From Case: '+c.subject); //this overrides the default behavior of pre-filling the title of the article with the subject of the closed case.
article.put('Details__c',c.description);
ctl.selectDataCategory('Geography','USA'); //Only one category per category
ctl.selectDataCategory('Topics','Maintenance');
}}