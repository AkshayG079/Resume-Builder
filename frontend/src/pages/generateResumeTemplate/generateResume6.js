const generateResume6 = (pdf, ResumeData) => {

    const lineColor = [150, 150, 150];
    const textColor = [50, 50, 50];
    const blueColor = [24, 119, 242];
    const lineWidth = 0.55;

    // Header: Name
    pdf.setFont("Helvetica", "bold");
    pdf.setFontSize(22);
    pdf.setTextColor(...blueColor);
    pdf.text(ResumeData.information.name, 105, 20, { align: "center" });

    // Header: Contact Info
    pdf.setFont("Helvetica", "normal");
    pdf.setFontSize(16);
    pdf.setTextColor(...textColor);
    const contactInfo = `${ResumeData.information.address} | ${ResumeData.information.phone} | ${ResumeData.information.email}`;
    pdf.text(contactInfo, 105, 30, { align: "center" });

    pdf.setFont("Helvetica", "bold");
    pdf.setFontSize(14);
    pdf.setTextColor(...blueColor);
    pdf.setFont("Helvetica", "normal");
    pdf.text(ResumeData.information.jobTitle, 10, 38);
    pdf.setTextColor(...textColor);
    pdf.setFontSize(12);

    let y = 45;
    const marginX = 10;
    const marginY = 10;
    const pageHeight = pdf.internal.pageSize.height;
    const maxWidth = pdf.internal.pageSize.width - marginX * 2;

    const wrappedText = pdf.splitTextToSize(ResumeData.information.jobDesc, 180);
    wrappedText.forEach((line) => {
        if (y > 270) {
            pdf.addPage();
            y = 20;
        }
        pdf.text(line, 10, y);
        y += 6;
    });

    function addWrappedText(content, fontSize = 12, lineHeight = 5, fontStyle = 'normal', paragraphSpacing = 2) {
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

        pdf.setDrawColor(...lineColor);
        pdf.setLineWidth(lineWidth);
        pdf.line(10, y - 8, 200, y - 8);
    }

    // Summary Section
    addSectionHeader(" Summary");
    ResumeData.summary.forEach((line) => addWrappedText(line.title));

    // Work Experience Section
    addSectionHeader("Work Experience");
    ResumeData.workExperience.forEach((work) => {
        addWrappedText(work.title, 14, 7, 'bold', 1);
        addWrappedText(work.description, 12, 5, 'normal');
    });

    // Skills Section
    addSectionHeader("Skills");
    ResumeData.skills.forEach((skill) => addWrappedText(skill.title, 12));

    // Education Section
    addSectionHeader("Education");
    ResumeData.education.forEach((edu) => {
        addWrappedText(`${edu.courseName}`, 12, 6, 'normal', 0);
        addWrappedText(`${edu.collegeName}`, 12, 6, 'normal', 0);
        addWrappedText(`${edu.startDate} - ${edu.endDate}`, 12, 6, 'normal', 0);
        addWrappedText(edu.description, 12, 6, 'normal');
    });

    // Interests Section
    addSectionHeader("Interests");
    ResumeData.interests.forEach((interests) => addWrappedText(interests.title, 12));

    // Custom Fields Section
    ResumeData.customFields.forEach((field) => {
        if (field.heading && field.title && field.description) {
            addSectionHeader(field.heading);
            addWrappedText(field.title, 14, 6, 'bold', 1);
            addWrappedText(field.description, 12, 6, 'normal', 2);
        }
    });

}

export default generateResume6;
