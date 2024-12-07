package com.example.login.Dto;

import com.example.login.entity.Exam;

public class ExamDTO {

    // Fields for creating an exam (input)
    private String name;
    private String examDate; // ISO format: yyyy-MM-dd
    private String startTime; // ISO format: HH:mm
    private String endTime;   // ISO format: HH:mm
    private Long sessionId;
    private Long localId;
    private Long moduleId;
    private Long optionId;
    private Long instructorId;
    private int nombreDesEtudiants;

    // Fields for returning an exam (output)
    private String sessionName;   // Human-readable session type
    private String localName;     // Human-readable local name
    private String moduleName;    // Human-readable module name
    private String optionName;    // Human-readable option name
    private String instructorName; // Human-readable instructor name

    // Default constructor
    public ExamDTO() {}

    // Constructor for responses
    public ExamDTO(Exam exam) {
        this.name = exam.getName();
        this.examDate = exam.getExamDate().toString();
        this.startTime = exam.getStartTime().toString();
        this.endTime = exam.getEndTime().toString();
        this.nombreDesEtudiants = exam.getNombreDesEtudiants();
        this.sessionId = exam.getSession().getId();
        this.localId = exam.getLocal().getId();
        this.moduleId = exam.getModule().getId();
        this.optionId = exam.getOption().getId();
        this.instructorId = exam.getInstructor().getId();
        this.sessionName = exam.getSession().getSessionType();
        this.localName = exam.getLocal().getNom();
        this.moduleName = exam.getModule().getName();
        this.optionName = exam.getOption().getName();
        this.instructorName = exam.getInstructor().getFirstName() + " " + exam.getInstructor().getLastName();
    }

    // Getters and setters (include both input and output fields)

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getNombreDesEtudiants() {
        return nombreDesEtudiants;
    }

    public void setNombreDesEtudiants(int nombreDesEtudiants) {
        this.nombreDesEtudiants = nombreDesEtudiants;
    }

    public String getExamDate() {
        return examDate;
    }

    public void setExamDate(String examDate) {
        this.examDate = examDate;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public Long getSessionId() {
        return sessionId;
    }

    public void setSessionId(Long sessionId) {
        this.sessionId = sessionId;
    }

    public Long getLocalId() {
        return localId;
    }

    public void setLocalId(Long localId) {
        this.localId = localId;
    }

    public Long getModuleId() {
        return moduleId;
    }

    public void setModuleId(Long moduleId) {
        this.moduleId = moduleId;
    }

    public Long getOptionId() {
        return optionId;
    }

    public void setOptionId(Long optionId) {
        this.optionId = optionId;
    }

    public Long getInstructorId() {
        return instructorId;
    }

    public void setInstructorId(Long instructorId) {
        this.instructorId = instructorId;
    }

    public String getSessionName() {
        return sessionName;
    }

    public void setSessionName(String sessionName) {
        this.sessionName = sessionName;
    }

    public String getLocalName() {
        return localName;
    }

    public void setLocalName(String localName) {
        this.localName = localName;
    }

    public String getModuleName() {
        return moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    public String getOptionName() {
        return optionName;
    }

    public void setOptionName(String optionName) {
        this.optionName = optionName;
    }

    public String getInstructorName() {
        return instructorName;
    }

    public void setInstructorName(String instructorName) {
        this.instructorName = instructorName;
    }
}
