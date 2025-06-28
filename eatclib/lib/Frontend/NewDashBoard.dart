import 'package:flutter/material.dart';

class Newdashboard extends StatefulWidget {
  const Newdashboard({super.key});

  @override
  State<Newdashboard> createState() => _NewdashboardState();
}

class _NewdashboardState extends State<Newdashboard> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(child: Text("This Is Only For The Repo Updates Testing"),),
    );
  }
}