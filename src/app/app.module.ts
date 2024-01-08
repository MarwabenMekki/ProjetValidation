import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { BestSmarteduComponent } from './components/best-smartedu/best-smartedu.component';
import { EducationSchoolComponent } from './components/education-school/education-school.component';
import { HistoryComponent } from './components/history/history.component';
import { PlansComponent } from './components/plans/plans.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { DashboardStudentComponent } from './components/dashboard-student/dashboard-student.component';
import { DashboardTeacherComponent } from './components/dashboard-teacher/dashboard-teacher.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { UsersTableComponent } from './components/users-table/users-table.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { AffectStudentsComponent } from './components/affect-students/affect-students.component';
import { NoteEvaluationComponent } from './components/note-evaluation/note-evaluation.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BestSmarteduComponent,
    EducationSchoolComponent,
    HistoryComponent,
    PlansComponent,
    TestimonialsComponent,
    LoginComponent,
    SignupComponent,
    DashboardAdminComponent,
    DashboardStudentComponent,
    DashboardTeacherComponent,
    UsersTableComponent,
    CoursesTableComponent,
    EditUserComponent,
    AddCourseComponent,
    EditCourseComponent,
    AffectStudentsComponent,
    NoteEvaluationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
