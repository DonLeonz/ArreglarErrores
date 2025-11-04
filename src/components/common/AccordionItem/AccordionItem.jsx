const AccordionItem = ({ icon, title, children }) => {
  return (
    <li className="uk-card uk-card-body uk-box-shadow-medium uk-border-rounded catalog-accordion-item">
      <a href="#" className="uk-accordion-title uk-text-lead uk-text-bold">
        {icon} {title}
      </a>
      <div className="uk-accordion-content uk-padding-small">{children}</div>
    </li>
  );
};

export default AccordionItem;
