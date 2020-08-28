import React, { useState } from "react";

import "./form.styles.css";
import enums from "../../data/enums";
import FormSection from "./form-section";

const Form = (props) => {
  const { formType } = props;
  const [currentSection, setSection] = useState(0);
  const [formData, setFormData] = useState({});

  const formSections = Object.values(enums).map((formSection, i) => (
    <FormSection
      key={`Form Section ${i}`}
      sectionTitle={formSection.title}
      formLabels={formSection.formLabels}
      section={i}
      currentSection={currentSection}
      setSection={setSection}
      maxSections={Object.values(enums).length - 1}
      formData={formData}
      setFormData={setFormData}
    />
  ));
  return <form className="Form">{formSections}</form>;
};

export default Form;
