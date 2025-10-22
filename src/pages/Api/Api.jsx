import GitHubSearch from "../../components/features/ApiSearch/GitHubSearch/GitHubSearch";
import MangaDexSearch from "../../components/features/ApiSearch/MangaDexSearch/MangaDexSearch";
import AccordionItem from "../../components/common/AccordionItem/AccordionItem";
import "./Api.css";

const Api = () => {
  return (
    <div className="uk-background-cover first-child-adjustment uk-height-viewport api-background">
      <div className="uk-container uk-section">
        <h1 className="uk-heading-line uk-text-center uk-margin-large-bottom api-title">
          Explora APIs
        </h1>
        <ul className="uk-accordion" data-uk-accordion="multiple: true">
          <AccordionItem
            icon={<span data-uk-icon="icon: github; ratio: 2"></span>}
            title="GitHub API"
          >
            <GitHubSearch />
          </AccordionItem>
          <AccordionItem icon="📚" title="MangaDex API">
            <MangaDexSearch />
          </AccordionItem>
        </ul>
      </div>
    </div>
  );
};

export default Api;
