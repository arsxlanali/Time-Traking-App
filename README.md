![](RackMultipart20221007-1-a893kq_html_e529ac4f467da965.png)

### **SCOPE DOCUMENT FOR Time Tracking**

**Table of Contents**

Purpose of Time Tracking………………………………………………………………………………. 1

Types of Users…………………………………………………………………………………………….1

User Stories……………………………………………………………………………………………….1

Main feature - 1…………………………………………………………………………………..1

US - 01 Login……………………………………………………………………………1

US - 02 Timesheet……………………………………………………………………….1

US - 03 Add Employee………………………………………………………………….1

US - 04 View Employee………………………………………………………………....2

US - 05 Add Projects…………………………………………………………………….2

US - 06 View Projects…………………………………………………………………....2

US - 07 TimeSheet Add………………………………………………………………….2

US - 08 TimeSheet End My Day……………………………………………………...…3

System Stories………………………………………………………………………………….....3

Multi-Tenancy……………………………………………………………………..……..3

Platforms…………………………………………………………………………………3

Responsiveness……………………………………………………………………….….3

Users and Load……………………………………………………………………….….3

Modular Design……………………………………………………………………….…3

### **Purpose:**

The purpose of the project is to make efficient use of time. By tracking our day-to-day tasks we hold ourselves accountable when we see some unfinished tasks on our lists. This helps us to be more productive in our work environment and helps us achieve our daily goals. For this purpose, we were using **Google Sheets** to track our time, as we know that maintaining a sheet is a time-consuming task which requires a lot of effort. As we know that it takes a lot of effort to maintain **Google Sheets** for management and also account for privacy. Management has to maintain several links for individual employees. To **solve this problem** we came up with the solution of creating an application in which we can efficiently use our time. This helps us to be more productive.

### **Types of Users:**

1. Admin
2. Management
3. Employees

### **User Stories:**

US - 01 Login

- Users: All Users
- Description: The user first lands on the login page, after that he/she enters the credentials on

the login screen.

US - 02 Timesheet

- Users: All Users
- Description: After login, the user will land on the timesheet module and will see today's date

selected in the timesheet.

US - 03 Add Employee

- Users: Management, Admin
- Description: Management and admin can see the Employee module in which he/she can add

new employee information such as name, email, number, position, designation, and role. After clicking the add button the user will be redirected to the view employee page with a list of all employees.

US - 04 View Employee

- Users: Management, Admin
- Description: Management and admin can see the view employee module with a list of all

employees in pagination, with one action button on the respective employee list. When the user clicks that button he/she can see the three options Edit, Delete and View. By clicking the edit button, users can land on the edit page with employee information already added to the input boxes. Users can change that information. By clicking the delete button the user will be shown the confirmation dialogue box and can delete the employee or cancel the action. The view employee button will land on the view table with all the information about the employee.

US - 05 Add Projects

- Users: Management, Admin
- Description: Management and admin can see the Add project section in which he/she can add

new project information such as name, description and assigned fields. Users can assign multiple employees to a single project. After clicking the add button the user will be redirected to the view project page with a list of all projects.

US - 06 View Projects

- Users: Management, Admin
- Description: Management and admin can see the view project module with a list of all

projects, with one action button on the respective project list. When the user clicks that button he/she can see the three options Edit, Delete and View. Users can land on the edit page with respective project information already added to the input boxes by clicking the edit button. Users can change that information. By clicking the delete button the user can delete the project and see the waiting of the action. The view button will land on the view table with all the project information.

US - 07 TimeSheet Add

- Users: All Users
- Description: Users can see the Add Task and End My Day button. Users will be able to select

today or previous dates. By clicking the Add task button the user will see the model with the input form. Users can add information like Task Type, description, project and duration. Two input fields are given for users' preferences. Users can add the task and see the background of the dialogue box updating after the successful addition. Users can add multiple tasks and can close the model. After closing the model, the user can see the saved information before the adding button is clicked. Users can see the Actions button and by clicking it users will see the two options of edit and delete. Users will be able to delete the task by clicking the delete button. And can edit the task by clicking the edit button.

US - 08 TimeSheet End My Day

- Users: All Users
- Description: The user will be able to see the End My Day button by clicking this will empty

the task nothing will happen. When we click it with one or more tasks the user will see that every button is gone and now the user cannot edit delta and add new tasks. The day will end on the respective selected dates.

### **System Stories**

-
#### **Multi-Tenancy:**

The multi-tenancy is applicable in this application. Some users like Admin and Management have some special privileges. The system will not allow other users to access the link of the other groups unless it is logged in.

-
#### **Platform:**

Web-based system.

Chrome and Firefox compatibility.

Windows and Mac compatibility.

All web browsers

-
#### **Responsiveness:**

The system is fully responsive which uses the bootstrap for its responsiveness

-
#### **Users and Load:**

This application will be able to handle 1000 requests per second. Note that it's 1000 requests per second, not clients connected simultaneously. It can handle 10000 simultaneous clients without any issue.

-
#### **Modular Design:**

This application uses the modular design pattern by separating the redux and views module on the different directories. The icon and index js are on the other directories.