import { Component, OnInit } from "@angular/core";
import { from } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.css"]
})
export class TestComponent implements OnInit {
  tests: any;
  testQ = [];
  id;
  count;
  options;
  testname;
  length;
  testQuestion;
  checkBoxArray = [];
  checkAns;
  radio;
  ok;

  result = 0;

  data = this.builder.group({
    index: [[]]
  });

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private builder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.count = 0;
    this.id = this.route.snapshot.params.name;

    this.http
      .get<{ message: string; status: string; tests: any }>(
        "http://interviewapi.stgbuild.com/getQuizData"
      )
      .subscribe(res => {
        this.tests = res.tests;
        console.log(this.tests);

        this.testname = this.tests[this.id].name;

        this.testQuestion = this.tests[this.id].questions[this.count].type;

        this.testQ = this.tests[this.id].questions[this.count].questionText;

        this.options = this.tests[this.id].questions[this.count].options;

        // if (this.testQuestion === undefined) {
        //   if (
        //     this.data.value.index ==
        //     this.tests[this.id].questions[this.count].correctOptionIndex
        //   ) {
        //     this.result++;
        //   }
        // }

        console.log(this.data.value);

        this.length = this.tests[this.id].questions.length;

        this.data.reset();

        this.length--;
      });
  }

  onNext() {

    this.check();
    console.log(this.result);

    this.count++;

    if (this.count <= this.length) {
      this.testQ = this.tests[this.id].questions[this.count].questionText;
      this.options = this.tests[this.id].questions[this.count].options;
      this.testQuestion = this.tests[this.id].questions[this.count].type;
    } else {
      console.log("finish");
    }

    this.data.reset();
  }
  checkbox(data, data1) {

    if (data1 == true) {
      this.checkBoxArray.push(data);
    } else {
      this.checkBoxArray.splice(this.checkBoxArray.indexOf(data), 1);
    }
    }

    check(){
      if (this.testQuestion === undefined) {
        if (
          this.data.value.index ==
          this.tests[this.id].questions[this.count].correctOptionIndex
        ) {
          this.result++;
        }
      } else {
        this.checkAns = this.tests[this.id].questions[
          this.count
        ].correctOptionIndex;
        if (this.checkBoxArray.length == this.checkAns.length) {
          let flag = 0;
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < this.checkAns.length; i++) {
          // tslint:disable-next-line: prefer-for-of
            for (let j = 0; j < this.checkBoxArray.length; j++) {
              if (this.checkAns[i] == this.checkBoxArray[j]) {
                flag++;
              }
            }
          }

          if (flag == this.checkBoxArray.length) {
            this.result++;
          }
        }
      }

    }

    onFinish(){
      this.check();
      this.router.navigate(['result', this.id, this.result]);
    }
  }
