import 'package:eatclib/Frontend/DashBoardScreen.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(Object context) {
    return MaterialApp(
      theme: ThemeData.dark(),
      home: Dashboardscreen(),
    );
  }
}
