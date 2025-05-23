const generateResume4 = (pdf, ResumeData) => {
    
    const primaryColor = [40, 40, 40];
    const lineColor = [128, 128, 128];
    const lineWidth = 0.55;

    // Header Section
    pdf.setFont("Helvetica", "bold");
    pdf.setFontSize(18);
    pdf.setTextColor(...primaryColor);
    pdf.text(ResumeData.information.name, pdf.internal.pageSize.width / 2, 20, { align: 'center' });

    pdf.setFillColor(220, 220, 220);
    pdf.rect(10, 25, 190, 7, 'F'); // Draw filled rectangle at x=10, y=27, width=190, height=10

    pdf.setFont("Helvetica", "normal");
    pdf.setFontSize(12);
    pdf.setTextColor(...primaryColor);

    const text = `${ResumeData.information.address} | ${ResumeData.information.email} | ${ResumeData.information.phone}`;
    const textWidth = pdf.getStringUnitWidth(text) * pdf.getFontSize() / pdf.internal.scaleFactor;
    const xOffset = (190 - textWidth) / 2 + 10;
    pdf.text(text, xOffset, 30);

    let y = 50;
    const marginX = 10;
    const marginY = 10;
    const pageHeight = pdf.internal.pageSize.height;
    const maxWidth = pdf.internal.pageSize.width - marginX * 2;

    function addWrappedText(content, fontSize = 12, lineHeight = 7, fontStyle = 'normal', paragraphSpacing = 2) {
        pdf.setFont("Helvetica", fontStyle);
        pdf.setFontSize(fontSize);
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
        pdf.setTextColor(...primaryColor);
        pdf.text(title, pdf.internal.pageSize.width / 2, y, { align: 'center' });
        y += 10;

        pdf.setDrawColor(...lineColor);
        pdf.setLineWidth(lineWidth);
        pdf.line(10, y - 8, 200, y - 8);
    }

    // Summary Section
    addSectionHeader("Professional Summary");
    ResumeData.summary.forEach((line) => addWrappedText(line.title));

    // Work Experience Section
    addSectionHeader("Work Experience");
    ResumeData.workExperience.forEach((work) => {
        addWrappedText(work.title, 14, 7, 'bold', 1);
        addWrappedText(work.description, 12, 7, 'normal');
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

    // Education Section
    addSectionHeader("Education");
    ResumeData.education.forEach((edu) => {
        addWrappedText(`${edu.courseName}`, 12, 7, 'normal', 0);
        addWrappedText(`${edu.collegeName}`, 12, 7, 'normal', 0);
        addWrappedText(`${edu.startDate} - ${edu.endDate}`, 12, 7, 'normal', 0);
        addWrappedText(edu.description, 12, 7, 'normal');
    });

    // Custom Fields Section
    ResumeData.customFields.forEach((field) => {
        if (field.heading && field.title && field.description) {
            addSectionHeader(field.heading);
            addWrappedText(field.title, 14, 7, 'bold', 1);
            addWrappedText(field.description, 12, 7, 'normal', 2);
        }
    });
};

export default generateResume4