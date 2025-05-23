const handleDownload = () => {
    // Title Section
    pdf.setFont("Helvetica", "bold");
    pdf.setFontSize(18);
    pdf.setTextColor(40, 40, 40);
    pdf.text(ResumeData.information.name, 10, 20);

    // Contact Info Section
    pdf.setFont("Helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text(ResumeData.information.jobTitle, 10, 27);
    const contactInfo = `${ResumeData.information.address} | ${ResumeData.information.email} | ${ResumeData.information.phone}`;
    pdf.text(contactInfo, 10, 34);

    pdf.setDrawColor(0, 0, 0); // Set the draw color to black
    pdf.setLineWidth(0.75); // Optional: Set the thickness of the line
    pdf.line(10, 38, 200, 38); // Horizontal line below the contact info

    // Summary Section
    pdf.setFont("Helvetica", "bold");
    pdf.setFontSize(14);
    pdf.setTextColor(40, 40, 40);
    pdf.text("Summary", 10, 45);

    pdf.setDrawColor(128, 128, 128); // Set the draw color to gray
    pdf.setLineWidth(0.55); // Optional: Set the thickness of the line
    pdf.line(10, 48, 200, 48); // Horizontal line under the "Summary" title

    // Summary Content
    pdf.setFont("Helvetica", "normal");
    pdf.setFontSize(12);
    pdf.setTextColor(40, 40, 40);

    const summaryArray = ResumeData.summary || ['-'];
    let y = 54; // Starting position for text

    summaryArray.forEach((line) => {
        pdf.text(line.title, 10, y);
        y += 10; // Adjust line spacing
    });

    // Education Section
    pdf.setFont("Helvetica", "bold");
    pdf.setFontSize(14);
    pdf.setTextColor(40, 40, 40);
    pdf.text("Education", 10, y);
    y += 7; // Spacing after the title

    pdf.setDrawColor(128, 128, 128); // Set the draw color to gray
    pdf.setLineWidth(0.55); // Optional: Set the thickness of the line
    pdf.line(10, 48, 200, 48); // Horizontal line under the "Education" title

    const educationArray = ResumeData.education || [];
    educationArray.forEach((edu) => {
        pdf.setFont("Helvetica", "normal");
        pdf.setFontSize(12);
        pdf.text(`${edu.courseName}`, 10, y);
        pdf.text(`${edu.collegeName}`, 10, y + 7);
        pdf.text(`${edu.startDate} - ${edu.endDate}`, 10, y + 7);
        pdf.text(`${edu.description}`, 10, y + 7);
        y += 14; // Adjust line spacing
    });

    // Work Experience Section
    pdf.setFont("Helvetica", "bold");
    pdf.setFontSize(14);
    pdf.setTextColor(40, 40, 40);
    pdf.text("Work Experience", 10, y);
    y += 7; // Spacing after the title

    pdf.setDrawColor(128, 128, 128); // Set the draw color to gray
    pdf.setLineWidth(0.55); // Optional: Set the thickness of the line
    pdf.line(10, 48, 200, 48); // Horizontal line under the "Work Experience" title

    const workExperienceArray = ResumeData.workExperience || [];
    workExperienceArray.forEach((work) => {
        pdf.setFont("Helvetica", "normal");
        pdf.setFontSize(12);
        pdf.text(`${work.jobTitle} at ${work.company}`, 10, y);
        pdf.text(`${work.startDate} - ${work.endDate}`, 10, y + 7);
        pdf.text(work.description, 10, y + 14);
        y += 21; // Adjust line spacing
    });

    // Projects Section
    pdf.setFont("Helvetica", "bold");
    pdf.setFontSize(14);
    pdf.setTextColor(40, 40, 40);
    pdf.text("Projects", 10, y);
    y += 7; // Spacing after the title

    pdf.setDrawColor(128, 128, 128); // Set the draw color to gray
    pdf.setLineWidth(0.55); // Optional: Set the thickness of the line
    pdf.line(10, 48, 200, 48); // Horizontal line under the "Projects" title

    const projectsArray = ResumeData.projects || [];
    projectsArray.forEach((project) => {
        pdf.setFont("Helvetica", "normal");
        pdf.setFontSize(12);
        pdf.text(project.name, 10, y);
        pdf.text(project.description, 10, y + 7);
        y += 14; // Adjust line spacing
    });

    // Skills Section
    pdf.setFont("Helvetica", "bold");
    pdf.setFontSize(14);
    pdf.setTextColor(40, 40, 40);
    pdf.text("Skills", 10, y);
    y += 7; // Spacing after the title

    pdf.setDrawColor(128, 128, 128); // Set the draw color to gray
    pdf.setLineWidth(0.55); // Optional: Set the thickness of the line
    pdf.line(10, 48, 200, 48); // Horizontal line under the "Skills" title

    pdf.setFont("Helvetica", "normal");
    pdf.setFontSize(12);
    pdf.setTextColor(40, 40, 40);

    const skillsArray = ResumeData.skills || [];
    skillsArray.forEach((skill) => {
        pdf.setFont("Helvetica", "normal");
        pdf.setFontSize(12);
        pdf.text(skill, 10, y);
        y += 7; // Adjust line spacing
    });

    // Additional Sections (Optional)
    // Example: Add more sections like Certifications, Languages, etc., if they exist
    // This is an optional step and would follow the same pattern as above.

    // Save the PDF
    pdf.save("resume.pdf");
};
// **************

// ****************

// // Title Section
// pdf.setFont("Helvetica", "bold");
// pdf.setFontSize(18);
// pdf.setTextColor(40, 40, 40);
// pdf.text(ResumeData.information.name, 10, 20);

// // Contact Info Section
// pdf.setFont("Helvetica", "normal");
// pdf.setFontSize(12);
// pdf.text(ResumeData.information.jobTitle, 10, 27);
// const contactInfo = `${ResumeData.information.address} | ${ResumeData.information.email} | ${ResumeData.information.phone}`;
// pdf.text(contactInfo, 10, 34);

// pdf.setDrawColor(0, 0, 0); // Set the draw color to black
// pdf.setLineWidth(0.75); // Optional: Set the thickness of the line
// pdf.line(10, 38, 200, 38); // Horizontal line below the contact info

// // Summary Section
// pdf.setFont("Helvetica", "bold");
// pdf.setFontSize(14);
// pdf.setTextColor(40, 40, 40);
// pdf.text("Summary", 10, 48);

// pdf.setDrawColor(128, 128, 128); // Set the draw color to gray
// pdf.setLineWidth(0.55); // Optional: Set the thickness of the line
// pdf.line(10, 52, 200, 52); // Horizontal line under the "Summary" title

// // Summary Content
// pdf.setFont("Helvetica", "normal");
// pdf.setFontSize(12);
// pdf.setTextColor(40, 40, 40);

// const summaryArray = ResumeData.summary || ['-'];
// let y = 58; // Starting position for text

// summaryArray.forEach((line) => {
//     pdf.text(line.title, 10, y);
//     y += 10; // Adjust line spacing

//     // Check if we need to add a new page
//     if (y > 270) { // If y exceeds a certain limit, add a new page
//         pdf.addPage();
//         y = 20; // Reset y position for the new page
//     }
// });

// // Work Experience Section
// pdf.setFont("Helvetica", "bold");
// pdf.setFontSize(14);
// pdf.setTextColor(40, 40, 40);
// pdf.text("Work Experience", 10, y);
// y += 7; // Spacing after the title

// pdf.setDrawColor(128, 128, 128); // Set the draw color to gray
// pdf.setLineWidth(0.55); // Optional: Set the thickness of the line
// pdf.line(10, y - 4, 200, y - 4);

// const workExperienceArray = ResumeData.workExperience || ['-'];
// workExperienceArray.forEach((work) => {
//     pdf.setFont("Helvetica", "normal");
//     pdf.setFontSize(12);
//     pdf.text(`${work.title}`, 10, y + 2);
//     pdf.text(work.description, 13, y + 9);
//     y += 17; // Adjust line spacing

//     // Check if we need to add a new page
//     if (y > 270) {
//         pdf.addPage();
//         y = 20; // Reset y position for the new page
//     }
// });

// // Projects Section
// pdf.setFont("Helvetica", "bold");
// pdf.setFontSize(14);
// pdf.setTextColor(40, 40, 40);
// pdf.text("Projects", 10, y - 1);
// y += 7; // Spacing after the title

// pdf.setDrawColor(128, 128, 128); // Set the draw color to gray
// pdf.setLineWidth(0.55); // Optional: Set the thickness of the line
// pdf.line(10, y - 4, 200, y - 4);

// const projectsArray = ResumeData.projects || ['-'];
// projectsArray.forEach((project) => {
//     pdf.setFont("Helvetica", "normal");
//     pdf.setFontSize(12);
//     pdf.text(project.title, 10, y + 2);
//     pdf.text(project.description, 13, y + 9);
//     y += 14; // Adjust line spacing

//     // Check if we need to add a new page
//     if (y > 270) {
//         pdf.addPage();
//         y = 20;
//     }
// });

// // Skills Section
// pdf.setFont("Helvetica", "bold");
// pdf.setFontSize(14);
// pdf.setTextColor(40, 40, 40);
// pdf.text("Skills", 10, y + 4);
// y += 7; // Spacing after the title

// pdf.setDrawColor(128, 128, 128); // Set the draw color to gray
// pdf.setLineWidth(0.55); // Optional: Set the thickness of the line
// pdf.line(10, y, 200, y);

// pdf.setFont("Helvetica", "normal");
// pdf.setFontSize(12);
// pdf.setTextColor(40, 40, 40);

// const skillsArray = ResumeData.skills || ['-'];
// skillsArray.forEach((skill) => {
//     pdf.setFont("Helvetica", "normal");
//     pdf.setFontSize(12);
//     pdf.text(skill.title, 13, y + 8);
//     y += 7; // Adjust line spacing

//     // Check if we need to add a new page
//     if (y > 270) {
//         pdf.addPage();
//         y = 20;
//     }
// });

// // Education Section (Reordered to appear after Skills)
// pdf.setFont("Helvetica", "bold");
// pdf.setFontSize(14);
// pdf.setTextColor(40, 40, 40);
// pdf.text("Education", 10, y + 10);
// y += 7; // Spacing after the title

// pdf.setDrawColor(128, 128, 128); // Set the draw color to gray
// pdf.setLineWidth(0.55); // Optional: Set the thickness of the line
// pdf.line(10, y + 6, 200, y + 6);

// const educationArray = ResumeData.education || ['-'];
// educationArray.forEach((edu) => {
//     pdf.setFont("Helvetica", "normal");
//     pdf.setFontSize(12);
//     pdf.text(`${edu.courseName}`, 10, y + 12);
//     pdf.text(`${edu.collegeName}`, 10, y + 18);
//     pdf.setTextColor(140, 140, 140);
//     pdf.text(`${edu.startDate} - ${edu.endDate}`, 10, y + 25);
//     pdf.setTextColor(40, 40, 40);
//     pdf.text(`${edu.description}`, 13, y + 32);
//     y += 29; // Adjust line spacing

//     // Check if we need to add a new page
//     if (y > 270) {
//         pdf.addPage();
//         y = 20;
//     }
// });

// const customFieldsArray = ResumeData.customFields || ['-'];
// customFieldsArray.forEach((field) => {

//     pdf.setFont("Helvetica", "bold");
//     pdf.setFontSize(14);
//     pdf.text(`${field.heading}`, 10, y + 12);

//     pdf.setDrawColor(128, 128, 128); // Set the draw color to gray
//     pdf.setLineWidth(0.55); // Optional: Set the thickness of the line
//     pdf.line(10, y + 16, 200, y + 16);

//     pdf.text(` ${field.title}`, 10, y + 22);
//     pdf.setFont("Helvetica", "normal");
//     pdf.setFontSize(12);
//     pdf.text(` ${field.description}`, 13, y + 28);
//     y += 26; // Adjust line spacing

//     // Check if we need to add a new page
//     if (y > 270) {
//         pdf.addPage();
//         y = 20;
//     }
// });