import { useState } from "react";
import "../styles/help.css";

function Help({ role }) {
  const functions = {
    admin: [
      {
        functionName: "Upload File",
        features: [
          "Click on 'Upload file'",
          "Select the .csv file from the device.",
          "Confirm and press ‘Upload’.",
          "The system will display a progress bar.",
          "At the end, it will indicate if there were errors or if the upload was successful.",
        ],
      },
      {
        functionName: "Access Report / Dashboard",
        features: [
          "Access the ‘Reports / Dashboard’ tab.",
          "Filter by platform, campaign, ad set, country, region or date.",
          "View performance graphs (CPA, CTR, CPC, etc).",
        ],
      },
      {
        functionName: "User Management",
        features: [
          "Enter the ‘Users’ module.",
          "Create a new user: name, e-mail, role (user or admin).",
          "Delete or block users who are no longer active.",
        ],
      },
      {
        functionName: "Database Management",
        features: [
          "Access the ‘Database’ module.",
          "View uploaded files, download them and check their status.",
        ],
      },
      {
        functionName: "Suggestions for correct use",
        features: [
          "Verify that the information in the reports is updated and generated correctly with the right information.",
          "Instruct new users on how to use the tool and what possibilities it can bring to existing processes.",
        ],
      },
    ],
    user: [
      {
        functionName: "Upload File",
        features: [
          "Click on 'Upload file'",
          "Select the .csv file from the device.",
          "Confirm and press ‘Upload’.",
          "The system will display a progress bar.",
          "At the end, it will indicate if there were errors or if the upload was successful.",
        ],
      },
      {
        functionName: "Access Report / Dashboard",
        features: [
          "Access the ‘Reports / Dashboard’ tab.",
          "Filter by platform, campaign, ad set, country, region or date.",
          "View performance graphs (CPA, CTR, CPC, etc).",
        ],
      },
      {
        functionName: "Suggestions for correct use",
        features: [
          "Verify that the files are in the correct language and character format, otherwise it may cause problems in the processing and analysis of the data.",
          "Ensure that the file format (comma separated value) is correctly formatted to match the pre-set formats to ensure correct data processing.",
          "Do not reload the page during data loading and processing to ensure correct operation.",
        ],
      },
    ]
  };

  const functionByRole = functions[role] || [];
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <>
      <div className="manage-help-container">
          <h2 className="title-help">{role == "admin" ? "Administrator functions" : "User functions"}</h2>
      </div>
      <div className="accordion-container">
        {functionByRole.map((item, index) => (
          <div key={item.functionName} className="accordion-item">
            <button
              className="accordion-header"
              onClick={() => toggleAccordion(index)}
            >
              <span className="span-help">
                <strong>{index + 1}. {item.functionName}</strong>
              </span>
              <span>{activeIndex === index ? "▲" : "▼"}</span>
            </button>
            {activeIndex === index && (
              <div className="accordion-content">
                <ul>
                  {item.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );  
}

export default Help;
