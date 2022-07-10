import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AbstractControl, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Observable, Subject } from 'rxjs';


@Component({
  selector: 'app-wishlist-certificates',
  templateUrl: './wishlist-certificates.component.html',
  styleUrls: ['./wishlist-certificates.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WishlistCertificatesComponent implements OnInit, OnDestroy {

  //Initialize Variables
  //---------------------

  //Unscubscribe All
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  //Page View State (Default is "Loading..")
  viewState = 0;

  //Form Mode State (Add vs. Edit Mode)
  formMode = '';

  //Container to hold a list of items
  items: object;

  //Container to hold a single item
  item: Observable<any>;

  //Container to hold Current User
  fbuser = JSON.parse(localStorage.getItem('fbuser'));

  //Confirmation Dialog
  dialogconfigForm: FormGroup;

  //Empty Model
  model = new Certification();

  //Autocomplete Data
  //-----------------
  filteredData;

  options: string[] = ['Accreditation in Public Relations (APR)', 'Accreditation in Public Relations and Military Communication (APR+M)', 'Accredited Airport Executive (AAE)', 'Accredited Business Accountant/Advisor (ABA)', 'Accredited Business Communicator (ABC)', 'Accredited Buyers Representative (ABR)', 'Accredited Genealogist (AG)', 'Accredited in Medical Sales (AMS)', 'Accredited Land Consultant (ALC)', 'Accredited Legal Secretary (ALS)', 'Accredited Member (AM)', 'Accredited Senior Appraiser (ASA)', 'Adobe certified expert (ACE)', 'Advanced Practice Nurse (APN)', 'Advanced Practice Registered Nurse (APRN)', 'AEM 6 Architect', 'AEM 6 Developer', 'AEM 6 Developer Practitioner', 'AEM 6 Lead Developer', 'AEM Form Developer', 'Agile DevOps Expert', 'Agile Scrum Foundation', 'Airline Transport Pilot (ATP)', 'AMA Professional Certified Marketer (PCM) Marketing Management Certifications', 'AMA Professional Certified Marketer (PCM), Digital Marketing Certifications', 'Amazon Web Service (AWS) Certified Solutions Architect Certification', 'Amazon Web Services (AWS) Certified Developer', 'Amazon Web Services certification training', 'American Association of Sexuality Educator, Counselors and Therapists (ASSECT) Certified Sexual Counselor', 'American Association of Sexuality Educator, Counselors and Therapists (ASSECT) Certified Sexuality Educator', 'American Association of Sexuality Educators, Counselors and Therapist (ASSECT) Certified Sex Therapist', 'American Board Certified Teacher (ABCTE)', 'American Board of Professional Psychology (ABPP)', 'American College of Healthcare Architects (ACHA)', 'American College of Healthcare Architects Fellow (FACHA)', 'American Geriatrics Society Fellow (AGSF)', 'American Institute of Architects Fellow (FAIA)', 'American Institute of Architects Member (AIA)', 'American Institute of Certified Planners (AICP)', 'American Institute of Certified Planners Fellow (FAICP)', 'American Institute of Certified Planners Member (AICP)', 'American Society of Interior Designers Fellow (FASID)', 'American Society of Interior Designers Member (ASID)', 'American Society of Landscape Architects Fellow (FASLA)', 'American Society of Landscape Architects Member (ASLA)', 'Approved Clinical Supervisor (ACS)', 'ASAP Administrative Certification of Excellence (PACE)', 'ASQ Quality Assurance Certifications - Biomedical Auditor', 'ASQ Quality Assurance Certifications - Calibration Technician', 'ASQ Quality Assurance Certifications - HACCP Food Safety Auditor', 'ASQ Quality Assurance Certifications - Manager of Quality/Organizational Excellence', 'ASQ Quality Assurance Certifications - Pharmaceutical GMP Professional', 'ASQ Quality Assurance Certifications - Quality Auditor', 'ASQ Quality Assurance Certifications - Quality Engineer', 'Assessment Administration Specialist (AAS)', 'Associate Accountant Technician (AAT)', 'Associate Chartered Certified Accountants (ACCA)', 'Associate Emergency Manager (AEM)', 'Associate Fellow of the Aerospace Medical Association (AFAsMA)', 'Associate in Risk Management (ARM)', 'Associate Member of the Institute of Electrical and Electronics Engineers (AMIEEE)', 'Associate of the Casualty Actuarial Society (ACAS)', 'Associate of the Conference of Consulting Actuaries (ACA)', 'Associate of the Society of Actuaries (ASA)', 'Associate Professional in Human Resources (aPHR)', 'Associate Professional Risk Manager (APRM)', 'Associate Professional Soil Scientist (APSS)', 'Associate Safety Professional (ASP)', 'Associate System Engineering Professional', 'Associate Wildlife Biologist (AWB)', 'Association of Clinical Research Professionals', 'Association of Licensed Architects Fellow (FALA)', 'Association of Licensed Architects Member (ALA)', 'Atlassian Certified Professional (ACP)', 'Aviation Medical Examiner (AME)', 'AWS Certified Advanced Networking (ANS-C00)', 'AWS Certified Cloud Practitioner (CLF-C01)', 'AWS Certified Data Analytics (DAS-C01)', 'AWS Certified Database (DBS-C01)', 'AWS Certified Developer (DVA-C01)', 'AWS Certified DevOps Engineer (DOP-C01)', 'AWS Certified Machine Learning (MLS-C01)', 'AWS Certified Security (SCS-C01)', 'AWS Certified Solutions Architect (SAA-C02)', 'AWS Certified Solutions Architect (SAP-C01)', 'AWS Certified SysOps Administrator (SOA-C02)', 'Azure Administrator (AZ-104)', 'Azure AI Engineer (AI-102)', 'Azure AI Fundamentals (AI-900)', 'Azure Data Engineer (DP-203)', 'Azure Data Fundamentals (DP-900)', 'Azure Data Scientist (DP-100)', 'Azure Database Administrator (DP-300)', 'Azure Developer (AZ-204)', 'Azure for SAP Workloads (AZ-120)', 'Azure Fundamentals (AZ-900)', 'Azure IoT Developer (AZ-220)', 'Azure Security Engineer (AZ-500)', 'Azure Solutions Architect (AZ-303 + AZ-304)', 'Azure Stack Hub Operator (AZ-600)', 'Azure Virtual Desktop (AZ-140)', 'Basic Life Support Instructor (BLS-I)', 'Bing Ads Certificate', 'Board Certified Community Paramedic (CP-C)', 'Board Certified Critical Care Paramedic (CCP-C)', 'Board Certified Designated Infection Control Officer (DICO-C)', 'Board Certified Environmental Engineer', 'Board Certified Flight Paramedic (FP-C)', 'Board Certified Psychologist (ABPP)', 'Board Certified Tactical Paramedic (TP-C)', 'Board Certified Tactical Responder (TR-C)', 'Broadband Distribution Specialist (BDS)', 'Broadband Installation Professional (BPI)', 'Broadband Premises Expert (BPE)', 'Broadband Premises Technician (BPT)', 'Broadband TelecomCenter Specialist (BTCS)', 'Broadband Transport Specialist (BTS)', 'Business Class Services Specialist (BCSS)', 'Cadastral Mapping Specialist (CMS)', 'Campaign Architect', 'Campaign Business Practitioner', 'Certificate in Employment Relations, Law and Practice (CERLAP)', 'Certificate in Insurance (CII)', 'Certificate in Investment Performance Measurement (CIPM)', 'Certificate in Personnel Practice (CPP)', 'Certificate in Recruitment and Selection (CRS)', 'Certificate in Training Practice (CTP)', 'Certificated Flight Instructor (CFI)', 'Certification in Consultative Sales Communication', 'Certification in Consultative Sales Strategies', 'Certification in Control SeUCL lf-Assessment (CCSA)', 'Certification in Risk Management Assurance (CRMA)', 'Certification in Volunteer Administration (CVA)', 'Certifications in engineering graphics', 'Certified 8-VSB Specialist (8-VSB)', 'Certified Accounts Payable Associate (CAPA)', 'Certified Accounts Payable Professional (CAPP)', 'Certified Addictions Registered Nurse (CARN)', 'Certified Administrative Professional (CAP)', 'Certified Advanced Handwriting Analyst (CAHA)', 'Certified Aerospace Physiologist (CAsP)', 'Certified Aging-in-Place Specialist (CAPS)', 'Certified AM Directional Specialist (AMD)', 'Certified Analytics Professional (CAP)', 'Certified Anti-Money Laundering Specialist (CAMS)', 'Certified Anti-Terrorism Specialist (CAS)', 'Certified Assessment Evaluator (CAE)', 'Certified Assistant Refrigeration Operator (CARO)', 'Certified Associate in Project Management (CAPM)', 'Certified Association in Project Management (CAPM)', 'Certified Athletic trainer (ATC)', 'Certified At-Risk Adult Crime Tactics Specialist (CACTS)', 'Certified Audio Engineer (CEA)', 'Certified Benefits Professional (CBP)', 'Certified Biological Safety Professional (CBSP)', 'Certified Broadcast Meteorologist (CBM or AMS)', 'Certified Broadcast Networking Engineer (CBNE)', 'Certified Broadcast Networking Technologist (CBNT)', 'Certified Broadcast Technologist (CBT)', 'Certified Broadcast Television Engineer (CBTE)', 'Certified Business Energy Professional (BEP)', 'Certified Business Manager (CBM)', 'Certified California Municipal Treasurer (CCMT)', 'Certified Chief Information Security Officer (CCISO)', 'Certified Clinical Mental Health Counselor (CCMHC)', 'Certified Clinical Research Associate (CCRA)', 'Certified Clinical Research Coordinator (CCRC)', 'Certified Cloud Security Knowledge (CCSK)', 'Certified Cognitive-Behavioral Therapist (CCBT)', 'Certified Commercial Contract Manager (CCCM)', 'Certified Commercial Investment Member (CCIM)', 'Certified Compensation Professional (CCP)', 'Certified Computer Examiner (CCE)', 'Certified Construction Contract Administrator (CCCA)', 'Certified Construction Product Representative (CCPR)', 'Certified Construction Specifier (CCS)', 'Certified Cooperative Communicator (CCC)', 'Certified Corporate FP&A Professional (FP&A)', 'Certified Corporate Housing Professional (CCHP)', 'Certified Cost Professional (CCP)', 'Certified Cost Technician (CST)', 'Certified Credit Union Financial Counselor (CCUFC)', 'Certified Customer Service Representative (CCSR)', 'Certified Dangerous Goods Professional', 'Certified Defense Financial Manager (CDFM)', 'Certified Digital Marketing Professional (CDMP)', 'Certified Digital Radio Broadcast Specialist (DRB)', 'Certified Director of Assisted Living (CDAL)', 'Certified Disability Specialist (CDS)', 'Certified Divorce Financial Analyst (CDFA)', 'Certified Drafter (CD)', 'Certified E-Discovery Specialist (CEDS)', 'Certified Electronic Inspector', 'Certified Emergency Manager (CEM)', 'Certified Emergency Nurse (CEN)', 'Certified Employee Benefits Specialist (CEBS)', 'Certified Energy Auditor (CEA)', 'Certified Energy Manager (CEM)', 'Certified Engineering Technician (CET)', 'Certified Environmental Authority Supervisor (CEAS)', 'Certified Environmental Specialist (CES)', 'Certified Environmental, Safety and Health Trainer (CET)', 'Certified Estimating Professional (CEP)', 'Certified Ethical Hacker (CEH)', 'Certified Executive Pastry Chef (CEPC)', 'Certified Experience Analyst (CXA)', 'Certified Facilities Manager (CFM)', 'Certified Federal Contract Manager (CFCM)', 'Certified Federal Surveyor (CFedS)', 'Certified Financial Consultant (CFC)', 'Certified Financial Planner (CFP)', 'Certified Financial Services Auditor (CFSA)', 'Certified Fire Executive (CFE)', 'Certified Fire Protection Specialist (CFPS)', 'Certified Floodplain Manager (CFM)', 'Certified Forensic Claims Consultant (CFCC)', 'Certified Forensic Computer Examiner (CFCE)', 'Certified Forensic Interviewer (CFI)', 'Certified Fraud Examiner (CFE)', 'Certified Ganjier (CG)', 'Certified Gastroenterology Registered Nurse (CGRN)', 'Certified Genealogical Lecturer (CGL)', 'Certified Genealogist (CG)', 'Certified Genetic Counselor (CGC)', 'Certified Gottman Therapist (CGR)', 'Certified Government Auditing Professional (CGAP)', 'Certified Government Chief Information Officer (CGCIO)', 'Certified Government Finance Officer (CGFO)', 'Certified Government Financial Manager (CGFM)', 'Certified Graduate Associate (CGA)', 'Certified Graduate Builder (CGB)', 'Certified Graduate Remodele (CGR)', 'Certified Green IT Professional (IFGICT)', 'Certified Green Professional (CGP)', 'Certified Group Psychotherapist (CGP)', 'Certified Guest Service Professional (CGSP)', 'Certified Handwriting Analyst (CHA)', 'Certified Hazardous Materials Manager (CHMM)', 'Certified Health Education Specialist (CHES)', 'Certified Healthcare Simulation Educator (Advanced) (CHSE-A)', 'Certified Healthcare Simulation Educator (CHSE)', 'Certified Healthcare Simulation Operations Specialist (CHSOS)', 'Certified Heart Failure Nurse', 'Certified HIPAA Privacy Associate (CHPA)', 'Certified HIPAA Privacy Expert (CHPE)', 'Certified HIPAA Privacy Security Expert (CHPSE)', 'Certified HIPAA Professional (CHP)', 'Certified HIPAA Security Expert (CHSE)', 'Certified HIPAA Security Specialist (CHSS)', 'Certified Hospice and Palliative Licensed Nurse (CHPLN)', 'Certified Hospitality Administrator (CHA)', 'Certified Hospitality Digital Marketer (CHDM)', 'Certified Hospitality Educator (CHE)', 'Certified Hospitality Instructor (CHI)', 'Certified Hospitality Revenue Manager (CHRM)', 'Certified Hospitality Sales Executive (CHSE)', 'Certified Human Resources Professional (CHRP)', 'Certified Hypnotherapist (CHt)', 'Certified in Conflict Manager (CCM)', 'Certified in Exhibition Management (CEM)', 'Certified in Hospitality Business Acumen (CHBA)', 'Certified in Hospitality Sales Competences (CHSC)', 'Certified in Logistics, Transportation and Distribution (CLTD)', 'Certified in Production & Inventory Management (CPIM)', 'Certified in Public Health (CPH)', 'Certified in Risk and Information Systems Control (CRISC)', 'Certified in Security Supervision and Management (CSSM)', 'Certified in the Governance of Enterprise IT (CGEIT)', 'Certified Industrial Refrigeration Operator (CIRO)', 'Certified Information Professional (CIP)', 'Certified Information Security Manager (CISM)', 'Certified Information Systems Auditor (CISA)', 'Certified Information Systems Security Professional (CISSP)', 'Certified Institutional Protection Specialist (CIPS)', 'Certified Internal Auditor (CIA)', 'Certified Internal Control Professional (CICP)', 'Certified Internal Control Specialist (CICS)', 'Certified International Property Specialist (CIPS)', 'Certified Internet Web Associate', 'Certified Interpretive Guide (CIG)', 'Certified Law Enforcement Analyst (CLEA) program', 'Certified Legal Manager (CLM)', 'Certified Lodging Security Director (CLSD)', 'Certified Maintenance & Reliability Professional', 'Certified Maintenance and Reliability Technician', 'Certified Management Accountant', 'Certified Management Accountant (CMA)', 'Certified Manager (CM)', 'Certified Manufacturing Engineering', 'Certified Marketing Executive (CME)', 'Certified Massage Therapist (CMT)', 'Certified Master Anti-Terrorism Specialist (CMAS)', 'Certified Medical Administrative Assistance (CMAA)', 'Certified Medical Assistant (CMA)', 'Certified Meeting Planning Program', 'Certified Meeting Professional (CMP)', 'Certified Member (CM)', 'Certified Midwife (CM)', 'Certified Modeling and Simulation Professional (CMSP)', 'Certified Municipal Clerk (CMC)', 'Certified Municipal Finance Officer (CMFO)', 'Certified Network Professional (CCNP) Routing & Switching', 'Certified Network Professional (CNP)', 'Certified New Home Marketing Professional (CMP)', 'Certified New Home Sales Professional (CSP)', 'Certified Nurse-Midwife (CNM)', 'Certified Nursing Assistant (CNA)', 'Certified Occupational Therapy Assistant (COTA)', 'Certified Orthotist (CO)', 'Certified Park & Recreation Executive (CPRE)', 'Certified Park & Recreation Professional (CPRP)', 'Certified Payroll Professional (CPP)', 'Certified Personal Trainer (CPT)', 'Certified Pharmacy Technician (CPhT)', 'Certified Phlebotomy Technician (CPT)', 'Certified Photogrammetrist (CP)', 'Certified Playground Safety Inspector (CPSI)', 'Certified Professional Broadcast Engineer (CPBE)', 'Certified Professional Contract Manager (CPCM)', 'Certified Professional Geologist (CPG)', 'Certified Professional in Accessibility Core Competencies (CPACC)', 'Certified Professional in Infection Control (CIC)', 'Certified Professional in Supplier Diversity (CPSD)', 'Certified Professional in Supply Management (CPSM)', 'Certified Professional in Web Accessibility (CPWA)', 'Certified Professional Logistician (CPL)', 'Certified Professional Midwife (CPM)', 'Certified Professional Organizer (CPO)', 'Certified Professional Sales Person (CPSP)', 'Certified Professional Services Marketer (CPSM)', 'Certified Professional Soil Classifier (CPSC)', 'Certified Professional Soil Scientist (CPSS)', 'Certified Project Management Practitioner (CPMP)', 'Certified Project Manager (CPM)', 'Certified Property Manager (CPM)', 'Certified Protection Officer (CPO)', 'Certified Protection Professional (CPP)', 'Certified Public Accountant (CPA)', 'Certified Public Bookkeeping', 'Certified Public Finance Administrator (CPFA)', 'Certified Public Finance Officer (CPFO)', 'Certified Public Manager (CPM)', 'Certified Public Relations Counselor (CPRC)', 'Certified Public Works Manager (NJ) (CPWM)', 'Certified Public-Safety Executive (CPE)', 'Certified Radio and Television Broadcast Engineer (CBRTE)', 'Certified Radio Operator (CRO)', 'Certified Registered Nurse Anesthetist (CRNA)', 'Certified Regulatory Compliance Manager (CRCM)', 'Certified Rehabilitation Counselor (CRC)', 'Certified Reliability Engineer', 'Certified Respiratory Therapist (CRT)', 'Certified Respiratory Therapy Technician (CRTT)', 'Certified Revenue Management Executive (CRME)', 'Certified Room Division Executive (CRDE)', 'Certified Safety Professional (CSP)', 'Certified Safety Professional Certification (CSP)', 'Certified Sales Engineer (CSE)', 'Certified Sales Executive (CSE)', 'Certified Sales Leadership Professional (CSLP)', 'Certified Sales Operations Professional (CSOP)', 'Certified Scheduling Technician (CST)', 'Certified Scrum Master (CSM)', 'Certified Scrum Product Owner (CSPO)', 'Certified Scrum Professional (CSP)', 'Certified ScrumMaster (CSM)', 'Certified Secure Computer User (CSCU)', 'Certified Secure Software Lifecycle Professional (CSSLP)', 'Certified Senior Advisor (CSA)', 'Certified Senior Broadcast Engineer (CSBE)', 'Certified Senior Broadcast Radio Engineer (CSRE)', 'Certified Senior Broadcast Television Engineer (CSTE)', 'Certified Senior Radio and Television Broadcast Engineer (CSRTE)', 'Certified Sex Therapist (CST)', 'Certified Software Tester (CSTE)', 'Certified Speaking Professional (CSP)', 'Certified Special Event Professional (CSEP)', 'Certified Special Events Professional (CSEP)', 'Certified Specialist of Spirits (CSS)', 'Certified Specialist of Wine (CSW)', 'Certified Spirits Educator (CSE)', 'Certified Supply Chain Professional (CSCP)', 'Certified Systems Engineering Professional (CSEP)', 'Certified Tax Assessor (NJ) (CTA)', 'Certified Tax Collector (NJ) (CTC)', 'Certified Technology Manager (CTM / CSTM)', 'Certified Technology Specialist (CTS)', 'Certified Television Operator (CTO)', 'Certified Tissue Bank Specialist (CTBS)', 'Certified Tissue Banking Specialist (CTBS)', 'Certified Traditional/Non-traditional Reiki Master (RM)', 'Certified Transportation Professional (CTP)', 'Certified Treasury Professional (CTP)', 'Certified Trust and Financial Advisor (CTFA)', 'Certified Turnaround Professional (CTP)', 'Certified Usability Analyst (CUA)', 'Certified User Experience Analyst (CXA)', 'Certified Utility Safety Professional (CUSP)', 'Certified Veterinary Assistant (CVA)', 'Certified Virtualization Professional (CVP)', 'Certified Visitor Relations Specialist (CVRS)', 'Certified Wedding and Event Planner (CWEP)', 'Certified Wedding Planner (CWP)', 'Certified Wildlife Biologist (CWB)', 'Certified Wine Educator (CWE)', 'Certified Wireless Analysis Professional (CWAP)', 'Certified Wireless Design Professional (CWDP)', 'Certified Wireless Network Administrator (CWNA)', 'Certified Wireless Network Expert (CWNE)', 'Certified Wireless Security Professional (CWSP)', 'Certified Wound, Ostomy, and Continence Nurse (CWOCN, CWCN, COCN, CCCN, or CWON)', 'Certified Youth Development Specialist (CYDS)', 'Certified Youth Sports Administrator (CYSA)', 'Chartered Alternative Investment Analyst (CAIA)', 'Chartered Business Valuator (CBV)', 'Chartered Enterprise Risk Analyst (CERA)', 'Chartered Financial Analyst (CFA)', 'Chartered Global Management Accountant (CGMA)', 'Chartered Life Underwriter (CLU)', 'Chartered Management Consultant (ChMC)', 'Chartered Market Technician (CMT)', 'Chartered Property Casualty Underwriter (CPCU)', 'Chief EMS Officer (CEMSO)', 'Chief Fire Officer (CFO)', 'Chief Training Officer (CTO)', 'Cisco Certified DevNet Associate (CCDevA)', 'Cisco Certified DevNet Professional (CCDevP)', 'Cisco Certified Internetworking Expert (CCIE)', 'Cisco Certified Network Associate (CCNA)', 'Cisco Certified Network Professional (CCNP)', 'Citrix Certified Associate – Networking', 'Citrix Certified Associate – Visualization', 'Citrix Certified Professional –Visualization', 'Civil Air Patrol (CAP)', 'CIW- Web & Mobile Design Professional', 'CIW- Web Design Professional', 'CIW- Web Development Professional', 'CIW- Web Foundation Associate', 'Cloudera Certified Developer for Apache Hadoop (CCDH)', 'Code Academy HTML', 'Commercial Pilot (CP)', 'Communication Management Professional (CMP)', 'Compensation Management Specialist (CMS)', 'CompTIA A+ (A+)', 'Comptia Advanced Security Practitioner (CASP)', 'CompTIA Network+ (Network+)', 'CompTIA Project+ certification', 'CompTIA Security+ (Security+)', 'Construction Document Technologist (CDT)', 'Construction Health and Safety Technician (CHST)', 'Construction Specification Institute Member (CSI)', 'Consultative Sales Certification', 'Content Marketing Institute Online Training and Certification', 'Contract and Commercial Management Certification (CCM)', 'Copyblogger Certified Content Marketer', 'Council of Educators in Landscape Architecture Fellow (FCELA)', 'Council of Educators in Landscape Architecture Member (CELA)', 'Counselor of Real Estate (CRE)', 'Credentialed Advocate (CA)', 'Credentialed Manager (CM)', 'Credentialed Professional Gerontologist (CPG)', 'Cyber Secure Coder (CSC)', 'CyberSAFE (CBS)', 'CyberSec First Responder (CFR)', 'Data & Marketing Association DMA Certification', 'Data Analyst (DA-100)', 'Decision & Risk Management Professional (DRMP)', 'Defense Acquisition Workforce Improvement Act Contracting Certification (DAWIA Contracting Certification)', 'Dentariae Medicinae Doctoris (Doctor of Dental Medicine) (DMD)', 'Designated Aquatics Professional (AqP)', 'Designated Erosion Control Inspector (DECI)', 'DevOps Engineer (AZ-400)', 'Dialectical Behavior Therapist (DBT)', 'Digital Event Strategist Certification', 'Digital Events Strategist (DES)', 'Digital Video Engineering Professional (DVEP)', 'DigitalMarketer Certified Content Marketing Specialist', 'Diplomate in Acupuncture (Dipl.Ac.)', 'Diplomate in Oriental Medicine (Dipl.O.M.)', 'Diplomate of the American Board of Family Medicine (DABFM)', 'Diplomate of the American Board of Venous & Lymphatic Medicine (DABVLM)', 'Diplomate of the American College of Veterinary Internal Medicine (DACVIM)', 'Distinguished Toastmaster (DTM)', 'DOCSIS Engineering Professional (DEP)', 'Dynamics 365 Business Central Functional Consultant (MB-800)', 'Dynamics 365 Customer Service Functional Consultant (PL-200, MB-230)', 'Dynamics 365 Field Service Functional Consultant (PL-200, MB-240)', 'Dynamics 365 Finance Functional Consultant (MB-300, MB-310)', 'Dynamics 365 Fundamentals (CRM) (MB-910)', 'Dynamics 365 Marketing Functional Consultant (PL-200, MB-220)', 'Dynamics 365 Sales Functional Consultant (PL-200, MB-210)', 'Dynamics 365 Supply Chain Management Functional Consultant (MB-300, MB-330)', 'Dynamics 365 Supply Chain Management, Manufacturing Functional Consultant (MB-300, MB-320)', 'Dynamics 365: Finance and Operations Apps Developer (MB-300, MB-500)', 'Dynamics 365: Finance and Operations Apps Solution Architect (MB-700)', 'Dynamics365CommerceFunctionalConsultant (MB-340)', 'Earned Value Professional (EVP)', 'Editor in the Life Sciences (ELS)', 'Electromagnetic Compatibility Design Engineer', 'Emergency Medical Dispatcher (EMD)', 'Emergency Medical Technician - Basic (EMT-B)', 'Emergency Medical Technician – Intermediate/85 (EMT-I/85)', 'Emergency Medical Technician – Intermediate/99 (EMT-I/99)', 'Emergency Medical Technician - Paramedic (EMT-P)', 'Emergency Number Professional (ENP)', 'Engineer Intern (EI)', 'Engineer-in-Training (EIT)', 'Enrolled Actuary (EA)', 'Enrolled Agent (EA)', 'Environmental Health and Safety Professional Certificate', 'Equine Assisted Psychotherapist (EAGALA)', 'European/International Computer Drivering License (ECDL/ICDL)', 'Executive Fire Officer (EFO)', 'Eye Movement Desensitization and Reprocessing (EMDR)', 'Facebook Blueprint', 'Facilities Management Administrator (FMA)', 'Facilities Management Professional (FMP)', 'Federal Acquisition Certification in Contracting (FAC-C)', 'Fellow of the Academy of Emergency Management (FAcEM)', 'Fellow of the Aerospace Medical Association (FAsMA)', 'Fellow of the American Academy of Family Physicians (FAAFP)', 'Fellow of the American Academy of Neurology (FAAN)', 'Fellow of the American Academy of Pediatrics (FAAP)', 'Fellow of the American College of Cardiology (FACC)', 'Fellow of the American College of Dentists (FACD)', 'Fellow of the American College of Emergency Physicians (FACEP)', 'Fellow of the American College of Endocrinology (FACE)', 'Fellow of the American College of Osteopathic Family Physicians (FACOFP)', 'Fellow of the American College of Physicians (FACP)', 'Fellow of the American College of Surgeons (FACS)', 'Fellow of the American Congress of Obstetricians and Gynecologists (FACOG)', 'Fellow of the American Society for Parenteral and Enteral Nutrition (FASPEN)', 'Fellow of the American Society of Health-System Pharmacists (FASHP)', 'Fellow of the American Vein & Lymphatic Society (FACPh)', 'Fellow of the Casualty Actuarial Society (FCAS)', 'Fellow of the Conference of Consulting Actuaries (FCA)', 'Fellow of The Explorers Club (FEC)', 'Fellow of the Health Advocacy and Medical Exploration Society (FHAMES)', 'Fellow of the Institute of Electrical and Electronics Engineers (FIEEE)', 'Fellow of the National Speleological Society (FNSS)', 'Fellow of the Society of Actuaries (FSA)', 'Fellow of the Society of Decision Professionals (FSDP)', 'Financial Risk Manager (FRM)', 'Fire Marshal (FM)', 'Fire Officer (FO)', 'Fraternal Insurance Counselor (FIC)', 'Fraternal Insurance Counselor Fellow (FICF)', 'French Wine Scholar (FWS)', 'Fundamental Payroll Certification (FPC)', 'Fundamentals of Engineering (FE)', 'General Appraiser (MRA)', 'Geographic Information Systems Professional (GISP)', 'Geologist-in-Training (GIT)', 'Geometric Dimensioning & Tolerancing Professional – Technologist', 'Global Association for Quality Management (GAQM)/ Associate in Project Management', 'Global Professional in Human Resources (GPHR)', 'Global Remuneration Professional (GRP)', 'Global Travel Professional Certification', 'Google Ads Display Certification', 'Google Ads Search Certification', 'Google Adwords Certification', 'Google Analytics', 'Google Analytics Individual Certification', 'Google Associate Cloud Engineer (ACE)', 'Google Data Analytics Certificate', 'Google Digital Marketing and eCommerce Certificate', 'Google Digital Marketing Certification', 'Google IT Automation with Python Professional Certificate', 'Google IT Support Professional Certificate', 'Google Project Management Certificate', 'Google Shopping Ads Certification', 'Google UX Design Certificate', 'Graduate Master Builder (GMB)', 'Graduate Master Remodeler (GMR)', 'Graduate Realtor Institute (GRI)', 'Graduate Safety Practitioner (GSP)', 'Graduate Student Member of the Institute of Electrical and Electronics Engineers (GSMIEEE)', 'Group Benefits Associate (GBA)', 'Harvard Innovation and Entrepreneurship Certificate', 'Harvard Marketing Management Certification', 'Harvard Software Engineering Certificate', 'Heavy Recovery Specialist® (HRS)', 'High-Performance Building Design', 'High-Performance Sustainable Building Management (HP)', 'Hootsuite Certification - Advanced Social Strategy', 'Hootsuite Certification - Platform', 'Hootsuite Certification - Social Marketing Certification', 'Housing Credit Certified Professional (HCCP)', 'Hubspot Marketing Certifications - Content Marketing', 'Hubspot Marketing Certifications - Context Marketing', 'Hubspot Marketing Certifications - Email Marketing', 'Hubspot Marketing Certifications - Growth Driven Design', 'Hubspot Marketing Certifications - Hubspot Design', 'Hubspot Marketing Certifications - Inbound', 'Hubspot Marketing Certifications - Marketing Software', 'IAAP Certified Administrative Professional (CAP)', 'IAPMO Mechanical Inspector', 'ICA International Diploma in Compliance (ICAIDC)', 'Industry Certification in Contract Management - Defense (ICCM-D)', 'Industry Certification in Contract Management - Federal (ICCM-F)', 'Internet Protocol Engineering Professional (IPEP)', 'Investment Adviser Certified Compliance Professional (IACCP)', 'ISA Certified Automotive Professional', 'ISSP Certified Sustainability Professional (ISSP-CSP)', 'ISSP Sustainability ()', 'ISSP Sustainability Associate (ISSP-SA)', 'IT Infrastructure Library Certified (ITIL)', 'ITIL v3 Foundation', 'Key Accountant Certification Program', 'Land Surveyor Intern (LSI)', 'Land Surveyor-in-Training (LSIT)', 'Leadership in Energy and Environmental Design Accredited Professional (LEED AP)', 'Leadership in Energy and Environmental Design Green Associate (LEED GA)', 'Lean IT Kaizen (LITK)', 'Lean IT Leadership (LITL)', 'Lean IT Professional (LITP)', 'Licensed Acupuncturist (L.Ac.)', 'Licensed Associate Counselor (LAC)', 'Licensed Clinical Massage Therapist (LCMT)', 'Licensed Clinical Social Worker (LCSW)', 'Licensed Funeral Director (FD)', 'Licensed Marriage and Family Therapist (LMFT)', 'Licensed Massage Therapist (LMT)', 'Licensed Master Social Worker (LMSW)', 'Licensed Midwife (LM)', 'Licensed Paramedic (Texas) (LP)', 'Licensed Practical Nurse (much of U.S.) (LPN)', 'Licensed Professional Counselor (LPC or LCPC)', 'Licensed Professional Counselor (LPC)', 'Licensed Professional Soil Scientist, or similar (LPSS)', 'Licensed Public Accountant (LPA)', 'Licensed Veterinary Technician (LVT)', 'Licensed Vocational Nurse (California and Texas) (LVN)', 'Marine Physician Assistant (MPA)', 'Master Addictions Counselor (MAC)', 'Master Certified Health Education Specialist (MCHES)', 'Master Certified New Home Sales Professional (Master CSP)', 'Master Exercise Practitioner ()', 'Master in Residential Marketing (MIRM)', 'Master Mobile Application Developer (MMAD)', 'Master of Engineering Management (MEM)', 'Master of Health Informatics (MHI)', 'Master of Library and Information Science (MLIS)', 'Master of Mobile Application Security (MMAS)', 'Master of Public Health (MPH)', 'Master of Transportation Safety Administration (MTSA)', 'Master Project Manager (MPM)', 'Master Sommelier (MS)', 'Master Tower® (CMT)', 'Master Training Specialist (MTS)', 'Medical Gas Inspector 6020', 'Medical Gas Installer 6010', 'Medical Gas Instructor 6050', 'Medical Gas Maintenance Personnel 6040', 'Medical Gas Verifier 6030', 'Medical Laboratory Scientist (MLS)', 'Medical Laboratory Technician (MLT)', 'Medical Technologist (MT)', 'Member of the ACE (ACE)', 'Member of the American Academy of Actuaries (MAAA)', 'Member of the Appraisal Institute (MAI)', 'Member of the ASC (ASC)', 'Member of the CSA (CSA)', 'Member of the Institute of Electrical and Electronics Engineers (MIEEE)', 'Member of the MPSE (MPSE)', 'Member of the National Academy of Engineering (MNAE)', 'Member of the National Association of Appraisers (MNAA)', 'Member, Academy of Master Surgeon Educators (MAMSE)', 'Microsoft Certified Application Specialist (MCAS)', 'Microsoft Certified Database Administrator (MCDBA)', 'Microsoft Certified Desktop Support Technician (MCDST)', 'Microsoft Certified IT Professional (MCITP)', 'Microsoft Certified Professional (MCP)', 'Microsoft Certified Professional Developer (MCPD)', 'Microsoft Certified Solutions Associate (MCSA)', 'Microsoft Certified Solutions Developer (MCSD)', 'Microsoft Certified Solutions Expert (MCSE)', 'Microsoft Certified Systems Administrator (MCSA)', 'Microsoft Certified Systems Engineer (MCSE)', 'Microsoft Certified Trainer (MCT)', 'Microsoft Power Platform App Maker (PL-100)', 'Microsoft Power Platform Developer (PL-400)', 'Microsoft Power Platform Functional Consultant (PL-200)', 'Microsoft Power Platform Fundamentals (PL-900)', 'Microsoft Power Platform Solution Architect (PL-600)', 'Microsoft Technology Associate (MTA)', 'MIT Innovation and Technology Certification Program', 'Mobile Certified Marketer (MCM)', 'Mobile Intensive Care Paramedic (Alaska) (MICP)', 'Model Law Engineer (MLE)', 'Model Law Structural Engineer (MLSE)', 'Model Law Surveyor (MLS)', 'Modern Certified Classroom Trainer (MCCT)', 'Multi Sport Athlete (MSA)', 'Music Therapist- Board Certified (MT-BC)', 'Music Therapist, Board Certified (MT-BC)', 'National Board Certified Clinical Hypnotherapist (NBCCH)', 'National Board Certified Clinical Hypnotherapist in Public Service (NBCCH-PS)', 'National Board Certified Diplomate in Clinical Hypnotherapy (NBCDCH)', 'National Board Certified Diplomate in Clinical Hypnotherapy in Public Service (NBCDCH-PS)', 'National Board Certified Fellow in Clinical Hypnotherapy (NBCFCH)', 'National Board Certified Fellow in Clinical Hypnotherapy in Public Service (NBCFCH-PS)', 'National Board Certified Teacher (NBCT)', 'National Board for Certification in Hearing Instrument Sciences (NBC-HIS)', 'National Certified Addiction Counselor Level I (NCACI)', 'National Certified Addiction Counselor, Level II (NCACII)', 'National Certified Counselor (NCC)', 'National Certified Counselor (NCSC)', 'National Council for Interior Design Qualification Certified (NCIDQ)', 'National Council of Architectural Registration Boards Certified (NCARB)', 'National Crime Prevention Specialist (NCPS)', 'National Institute For Certification In Engineering Technologies (NICET I/II/III/IV)', 'National Registry of Environmental Professionals (NREP) Certifications', 'National Retail Federation Certification', 'Nationally Certified EMS Educator (NCEE)', 'Nationally Certified School Psychologist (NCSP)', 'Nationally Certified Tow Operator® (NCTO)', 'Nationally Registered Advanced Emergency Medical Technician (NRAEMT)', 'Nationally Registered Emergency Medical Responder (NREMR)', 'Nationally Registered Emergency Medical Technician (NREMT)', 'Nationally Registered Paramedic (NRP)', 'NCCB Administrative Assistant Certification (CAA)', 'NERC Certified System Operator (NCSO)', 'Nurse Practitioner (NP)', 'Nutrition and Dietetics Technician, Registered (NDTR, DTR)', 'Occupational Health and Safety Technologist (OHST)', 'Occupational Therapist (OT)', 'Offensive Security Certified Professional (OSCP)', 'Oracle Application Express Developer Certification (Oracle APEX)', 'Oracle Certified Associate (OCA)', 'Oracle Certified Associate (OCA) Java SE Programmer', 'Oracle Certified Master (OCM)', 'Oracle Certified Professional (OCP)', 'Oracle Certified Professional OCP Java SE Programmer, Java ME Mobile Application Developer', 'Oracle Certified Professional, (OCP) MYSQL 5.6 Developer', 'Personal Property Specialist (PPS)', 'Physical Therapist (PT)', 'Physical Therapy Assistant (PTA)', 'Physician Assistant (PA)', 'Physician Assistant (PA-C)', 'Planning & Scheduling Professional (PSP)', 'PMI Agile Certified Practitioner (PMI-ACP)', 'PMI-ACP Certification', 'PMP Agile Certified Practitioner (PMI-ACP)', 'Portfolio Management Professional (PfMP)', 'Principal Investigator (CPI)', 'Producers Mark (PGA)', 'Professional Certified Investigator (PCI)', 'Professional County Collector (PCC)', 'Professional Engineer (PE)', 'Professional Engineering License', 'Professional Geologist (PG)', 'Professional Hydrologist (PH)', 'Professional in Human Resources – California (PHRca)', 'Professional in Human Resources — International (PRHi)', 'Professional in Human Resources (PHR)', 'Professional in Project Management (PPM)', 'Professional Land Surveyor (PLS)', 'Professional Legal Secretary (PLS)', 'Professional Manager Certification (PMC)', 'Professional Planner (PP)', 'Professional Research Certification', 'Professional Risk Manager (PRM)', 'Professional Science Masters (PSM)', 'Professional Scrum Master I (PSM I)', 'Professional Scrum Master II (PSM II)', 'Professional Scrum Master III (PSM II)', 'Professional Surveyor & Mapper (PSM)', 'Program Management Professional (PgMP)', 'Project Management in IT Security (PMITS)', 'Project Management Professional (PMP)', 'Puppet Certification Program', 'Puppet Labs Certification Program', 'Qualified Clinical Social Worker (QCSW)', 'Qualified Purchasing Agent (NJ) (QPA)', 'Qualified SWPPP Designer (QSD)', 'Qualified SWPPP Practitioner (QSP)', 'Quality Engineer certification (CQE)', 'Real Property Administrator (RPA)', 'Red Hat Certified Architect (RHCA)', 'Red Hat JBoss certified developer', 'Registered Archaeologist (RA)', 'Registered Architect (RA)', 'Registered Business Analyst (RBA)', 'Registered Construction Inspector (Division I,II,III, or IV) (RCI)', 'Registered Dental Hygienist (RDH)', 'Registered Diagnostic Cardiac Sonographer (RDCS)', 'Registered Diagnostic Medical Sonographer (RDMS)', 'Registered Dietitian/Nutritionist (RD, RDN)', 'Registered Financial Planner (RFP)', 'Registered Interior Designer (RID)', 'Registered Land Surveyor (RLS)', 'Registered Landscape Architect (RLA)', 'Registered Municipal Accountant (RMA)', 'Registered Municipal Clerk (NJ) (RMC)', 'Registered Musculoskeletal Sonographer (RMSKS)', 'Registered Nurse (RN)', 'Registered Pharmacist (R.Ph. or RPh)', 'Registered Professional Archaeologist (RPA)', 'Registered Public Purchasing Official (NJ) (RPPO)', 'Registered Public Purchasing Specialist (NJ) (RPPS)', 'Registered Public-Safety Leader (RPL)', 'Registered Respiratory Therapist (RRT)', 'Registered Respiratory Therapist, Adult Critical Care Specialist (RRT-ACCS)', 'Registered Respiratory Therapist, Neonatal & Pediatric Specialist (RRT-NPS)', 'Registered Respiratory Therapist, Sleep Disorder Specialist (RRT-SDS)', 'Registered Tax Return Preparer (RTRP)', 'Registered Vascular Technologist (RVT)', 'Registered Veterinary Technician (RVT)', 'REHS Certification', 'Residential Appraiser (RA)', 'Residential Evaluation Specialist (RES)', 'Respiratory practitioner (RP, RCP)', 'RETA Authorized Instructor (RAI)', 'Retirement Plans Associate (RPA)', 'SAFe Advanced Scrum Masters (SASM)', 'SAFe Agilist (SA)', 'SAFe* Agilist Certification Training', 'Safety Management Specialist (SMS)', 'Safety Trained Supervisor (STS)', 'Safety Trained Supervisor Construction (STSC)', 'Salesforce Certification - Administrator', 'Salesforce Certification - Architect', 'Salesforce Certification - Consultant', 'Salesforce Certification - Developer', 'Salesforce Certification - Marketer', 'Salesforce Certified Developer & Advanced Developer', 'Scrum Alliance Certified Scrum Developer (CSD)', 'Senior Aviation Medical Examiner (SAME)', 'Senior Member of the Institute of Electrical and Electronics Engineers (SMIEEE)', 'Senior Member of the Institute of Industrial Engineers (SIIE)', 'Senior Professional in Human Resources — International (SPHRi)', 'Senior Professional in Human Resources (SPHR)', 'Senior Residential Appraiser (SRA)', 'SHRM Certified Professional (SHRM-CP)', 'SHRM Senior Certified Professional (SHRM-SCP)', 'SMEI Certified Professional Salesperson (SCPS)', 'Solar Heating Installer Certification', 'Sports Industry Management (SIM)', 'Stanford Innovation and Entrepreneurship Certificate', 'STAR Fire Sprinklerfitting Mastery', 'STAR HVACR Mastery', 'STAR Plumbing Mastery', 'STAR Steamfitting-Pipefitting Mastery', 'Strategic Communication Management Professional (SCMP)', 'Structural Engineer (SE)', 'Structural Engineering Certification Board (SECB)', 'Student Member of the Institute of Electrical and Electronics Engineers (StMIEEE)', 'Surveying Intern (SI)', 'Sustainability Facility Professional (SFP)', 'Systems Maintenance Administrator (SMA)', 'Systems Maintenance Technician (SMT)', 'Systems Security Certified Practitioner (SSCP)', 'Test and Balance Engineer', 'Title 24 Registry', 'Training from the BACK of the Room Certified Trainer (TBR-CT)', 'Traumatic Event Manager (TEM)', 'UCI Clinical Research Certificate', 'UCI Innovation & Product Development', 'User Experience Certification (UXC)', 'User Experience Master Certification (UXMC)', 'VMware Certified Professional (VCP)', 'VMware Certified Professional 5 – Data Center Virtualization (VCP5-DCV)', 'W3Schools Certification - CSS', 'W3Schools Certification - HTML5', 'W3Schools Certification - JavaScript', 'W3Schools Certification - jQuery', 'W3Schools Certification - PHP', 'W3Schools Certification - XML', 'Web Accessibility Specialist (WAS)', 'WELL Accredited Professional (WELL AP)', 'Zend Certified Engineer (ZCE)'];


  //Constructor
  //---------------------
  constructor(
    private _formBuilder: FormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    public db: AngularFireDatabase
  ) { }


  //Functions
  //---------------------

  //Fuction - Show the Add Form
  onShowAddForm(): void {

    //Set the View State
    this.viewState = 3;

    //Set the Form Mode
    this.formMode = 'add';
  }

  //Fuction - Show the Edit Form
  onShowEditForm(key): void {

    //Set the View State
    this.viewState = 3;

    //Set the Form Mode
    this.formMode = 'edit';

    //Define Observable Item based on the Key
    this.item = this.db.object('/users/' + this.fbuser.id + '/certifications/' + key).valueChanges();

    //Subscribe to Observable
    this.item.subscribe((item) => {
      this.model = new Certification(key, item.name, item.description, item.created, item.modified, item.user, item.awardedby, item.awardedon, item.expireson);
    });

  }

  //Function - Show the Delete Conf.
  onShowDelete(key): void {

    //Open the dialog and save the reference of it
    const dialogRef = this._fuseConfirmationService.open(this.dialogconfigForm.value);

    //Subscribe to afterClosed from the dialog reference
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
        //Call Actual Delete
        this.onDelete(key);
      }
    });
  }

  //Function - Add New Item to DB
  onAdd(form: NgForm): void {

    //Cast model to variable for formReset
    const mname: string = this.model.name;
    const mdescription: string = this.model.description;
    const mawardedby: string = this.model.awardedby;
    const mawardedon: string = this.model.awardedon;
    const mexpireson: string = this.model.expireson;
    const mdatenow = Math.floor(Date.now());

    //Define Promise
    const promiseAddItem = this.db.list('/users/' + this.fbuser.id + '/certifications')
      .push({ name: mname, description: mdescription, created: mdatenow, modified: mdatenow, user: this.fbuser.id, awardedby: mawardedby, awardedon: mawardedon, expireson: mexpireson });

    //Call Promise
    promiseAddItem
      .then(_ => this.db.object('/certifications/' + this.fbuser.id + '/' + _.key)
        .update({ name: mname, description: mdescription, created: mdatenow, modified: mdatenow, user: this.fbuser.id, awardedby: mawardedby, awardedon: mawardedon, expireson: mexpireson }))
      .then(_ => form.resetForm())
      .catch(err => console.log(err, 'Error Submitting Certification!'));

    //Increment Count
    this.db.object('/counts/' + this.fbuser.id + '/certifications').query.ref.transaction((likes) => {
      if (likes === null) {
        return likes = 1;
      } else {
        return likes + 1;
      }
    });

  }

  //Function - Update Item in DB
  onEdit(key): void {

    //Cast model to variable for formReset
    const mname: string = this.model.name;
    const mdescription: string = this.model.description;
    const mawardedby: string = this.model.awardedby;
    const mawardedon: string = this.model.awardedon;
    const mexpireson: string = this.model.expireson;
    const mdatenow = Math.floor(Date.now());

    this.db.object('/users/' + this.fbuser.id + '/certifications' + '/' + key)
      .update({ name: mname, description: mdescription, modified: mdatenow, awardedby: mawardedby, awardedon: mawardedon, expireson: mexpireson });
    this.db.object('/certifications/' + this.fbuser.id + '/' + key)
      .update({ name: mname, description: mdescription, modified: mdatenow, awardedby: mawardedby, awardedon: mawardedon, expireson: mexpireson });


    console.log(key + ' edited');
  }

  //Function - Delete Item in DB
  onDelete(key): void {
    this.db.object('/users/' + this.fbuser.id + '/certifications/' + key).remove();
    this.db.object('/certifications/' + this.fbuser.id + '/' + key).remove();

    //Decrement Count
    this.db.object('/counts/' + this.fbuser.id + '/certifications').query.ref.transaction((likes) => {
      if (likes === null) {
        return likes = 0;
      } else {
        return likes - 1;
      }
    });

    console.log(key + ' deleted');

  }

  //Function - Cancel the Add or Edit Form
  onCancelForm(form: NgForm): void {
    form.resetForm();
    this.viewState = 1;
  }

  onDateChange(event: MatDatepickerInputEvent<any>, control: AbstractControl, picker: string): void {
    console.log(picker);
    if (picker === 'expire') {
      this.model.expireson = ((event.value.valueOf()).toString());
    }
    else {
      this.model.awardedon = ((event.value.valueOf()).toString());
    }
  }

  applyFilter(evt: string): void {
    evt = evt + '';
    if (!evt) { this.filteredData = this.options; }
    else {
      this.filteredData = this.options.filter(item => (item + '') === evt || item.toLocaleLowerCase().indexOf(evt.toLocaleLowerCase()) >= 0);
    }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {

    //Call the Firebase Database and get the initial data.
    this.db.list('/users/' + this.fbuser.id + '/certifications').snapshotChanges().subscribe(
      (results: object) => {

        //Put the results of the DB call into an object.
        this.items = results;

        console.log(this.items);

        //Check if the results object is empty
        if (Object.keys(this.items).length === 0) {
          //It's empty, so set the view state to "No Data" mode.
          this.viewState = 2;
        }
        else {
          //It's not empty, so set the view state to "Show Data" mode.
          this.viewState = 1;
        };

      }
    );

    //Formbuilder for Dialog Popup
    this.dialogconfigForm = this._formBuilder.group({
      title: 'Remove Item',
      message: 'Are you sure you want to remove this item permanently? <span class="font-medium">This action cannot be undone!</span>',
      icon: this._formBuilder.group({
        show: true,
        name: 'heroicons_outline:exclamation',
        color: 'warn'
      }),
      actions: this._formBuilder.group({
        confirm: this._formBuilder.group({
          show: true,
          label: 'Remove',
          color: 'warn'
        }),
        cancel: this._formBuilder.group({
          show: true,
          label: 'Cancel'
        })
      }),
      dismissible: false
    });

  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

}

// -----------------------------------------------------------------------------------------------------
// @ Models
// -----------------------------------------------------------------------------------------------------

// Empty Certification class
export class Certification {

  constructor(
    public key: string = '',
    public name: string = '',
    public description: string = '',
    public created: string = '',
    public modified: string = '',
    public user: string = '',
    public awardedby: string = '',
    public awardedon: string = '',
    public expireson: string = '',

  ) { }

}
