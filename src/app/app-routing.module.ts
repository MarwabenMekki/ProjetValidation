import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardStudentComponent } from './components/dashboard-student/dashboard-student.component';
import { DashboardTeacherComponent } from './components/dashboard-teacher/dashboard-teacher.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { AffectStudentsComponent } from './components/affect-students/affect-students.component';

const routes: Routes = [
  
{path:"",component:HomeComponent},
{path:"login",component:LoginComponent},
{path:"dashboardAdmin",component:DashboardAdminComponent},
{path:"subscription", component: SignupComponent},
{path:"signupTeacher",component:SignupComponent},
{path:"signupAdmin",component:SignupComponent},
{path:"signupParent",component:SignupComponent},
{path:"dashboardStudent",component:DashboardStudentComponent},
{path:"dashboardTeacher",component:DashboardTeacherComponent},
{path:"editUser/:id",component:EditUserComponent},
{path:"editCourse/:id",component:EditCourseComponent},
{path:"addCourse",component:AddCourseComponent},
{path:"affectStudents",component:AffectStudentsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
