const generateResume1 = (pdf, ResumeData) => {

    const blueColor = [24, 119, 242];
    const textColor = [0, 0, 0];
    const lineWidth = 0.55;

    pdf.addImage(ResumeData.information.pic, 'PNG', 10, 10, 40, 40);

    pdf.setFont("Helvetica", "bold");
    pdf.setFontSize(20);
    pdf.setTextColor(...blueColor); 
    pdf.text(ResumeData.information.name, 60, 20);

    pdf.setFont("Helvetica", "normal");
    pdf.setFontSize(12);
    pdf.setTextColor(...textColor);
    pdf.text(`Email: ${ResumeData.information.email}`, 60, 29);
    pdf.text(`Phone : ${ResumeData.information.phone}`, 60, 36);
    pdf.text(`Address: ${ResumeData.information.address}`, 60, 43);

    let y = 69;
    const marginX = 10;
    const marginY = 10;
    const pageHeight = pdf.internal.pageSize.height;
    const maxWidth = pdf.internal.pageSize.width - marginX * 2;

    function addWrappedText(content, fontSize = 12, lineHeight = 7, fontStyle = 'normal', paragraphSpacing = 2) {
        pdf.setFont("Helvetica", fontStyle);
        pdf.setFontSize(fontSize);
        pdf.setTextColor(...textColor);
        const wrappedText = pdf.splitTextToSize(content, maxWidth);
        wrappedText.forEach((line) => {
            if (y + lineHeight > pageHeight - marginY) {
                pdf.addPage();
                y = marginY;
            }
            pdf.text(line, marginX, y);
            y += lineHeight;
        });
        y += paragraphSpacing;
    }

    function addSectionHeader(title) {
        pdf.setFont("Helvetica", "bold");
        pdf.setFontSize(16);
        pdf.setTextColor(...blueColor);
        pdf.text(title, 10, y);
        y += 10;

        pdf.setDrawColor(...blueColor);
        pdf.setLineWidth(lineWidth);
        pdf.line(10, y - 8, 200, y - 8);
    }


    // Summary Section
    addSectionHeader("Summary");
    ResumeData.summary.forEach((line) => addWrappedText(line.title));

    // Work Experience Section
    addSectionHeader("Work Experience");
    ResumeData.workExperience.forEach((work) => {
        addWrappedText(work.title, 14, 7, 'bold', 1);
        addWrappedText(work.description, 12, 7, 'normal');
    });

    // Education Section
    addSectionHeader("Education");
    ResumeData.education.forEach((edu) => {
        addWrappedText(`${edu.courseName}`, 12, 7, 'normal', 0);
        addWrappedText(`${edu.collegeName}`, 12, 7, 'normal', 0);
        addWrappedText(`${edu.startDate} - ${edu.endDate}`, 12, 7, 'normal', 0);
        addWrappedText(edu.description, 12, 7, 'normal');
    });

    // Projects Section
    addSectionHeader("Projects");
    ResumeData.projects.forEach((project) => {
        addWrappedText(project.title, 14, 7, 'bold', 1);
        addWrappedText(project.description, 12, 7, 'normal');
    });

    // Skills Section
    addSectionHeader("Skills");
    ResumeData.skills.forEach((skill) => addWrappedText(skill.title, 12));

    // Certificate Section
    addSectionHeader("Certificate");
    ResumeData.certificates.forEach((project) => {
        addWrappedText(project.title, 14, 7, 'bold', 1);
        addWrappedText(project.description, 12, 7, 'normal');
    });

     // Custom Fields Section
     ResumeData.customFields.forEach((field) => {
        if (field.heading && field.title && field.description) {
            addSectionHeader(field.heading);
            addWrappedText(field.title, 14, 7, 'bold', 1);
            addWrappedText(field.description, 12, 7, 'normal', 2);
        }
    });
}
export default generateResume1;