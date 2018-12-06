
use std::fs;
use std::str::FromStr;
use std::num::ParseIntError;

#[derive(Debug, Clone, PartialEq)]
struct Point {
    x: i32,
    y: i32,
}

impl Point {
    fn distance_to(&self, other: &Point) -> i32 {
        (other.x - self.x).abs() + (other.y - self.y).abs()
    }

    fn owns_location(&self, location: &Point, other_points: &Vec<Point>) -> bool {
        let min_distance = other_points.iter()
            .filter(|&p| p != self)
            .map(|p| p.distance_to(location))
            .min_by_key(|distance| distance.clone())
            .unwrap();

        self.distance_to(location) < min_distance
    }

    fn is_infinite(&self, other_points: &Vec<Point>) -> bool {
        let max_dimension = 300i32; // arbitrary number pls fix
        let off_in_distance = vec![
            Point { x: self.x + max_dimension, y: self.y },
            Point { x: self.x - max_dimension, y: self.y },
            Point { x: self.x, y: self.y + max_dimension },
            Point { x: self.x, y: self.y - max_dimension }
        ];

        off_in_distance.iter().any(|point| self.owns_location(point, other_points))
    }

    fn area(&self, other_points: &Vec<Point>) -> Option<i32> {
        if self.is_infinite(&other_points) {
            return None
        }

        let max_dimension = 300i32;
        let mut area = 0i32;

        for x in self.x - max_dimension..self.x + max_dimension {
            for y in self.y - max_dimension..self.y + max_dimension {
                if self.owns_location(&Point { x, y }, other_points) {
                    area += 1
                }
            }
        }
        Some(area)
    }
}

impl FromStr for Point {
    type Err = ParseIntError;
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let coords: Vec<&str> = s.split(", ").collect();

        Ok(Point {
            x: coords[0].parse::<i32>()?,
            y: coords[1].parse::<i32>()?
        })
    }
}

fn read_input_to_point_array(filename: &str) -> Vec<Point> {
    fs::read_to_string(filename)
        .expect("Could not find input file")
        .trim()
        .lines()
        .map(|line| Point::from_str(line).unwrap())
        .collect()
}

fn puzzle_one(points: &Vec<Point>) -> i32 {
    points.iter()
        .map(|point| if let Some(area) = point.area(&points) { area } else { 0i32 })
        .max_by_key(|area| *area)
        .unwrap()
}

fn puzzle_two(points: &Vec<Point>) -> i32 {
    let max_distance = 10_000;
    let max_x = points.iter().map(|p| p.x).max_by_key(|&x| x).unwrap();
    let min_x = points.iter().map(|p| p.x).min_by_key(|&x| x).unwrap();
    let max_y = points.iter().map(|p| p.y).max_by_key(|&y| y).unwrap();
    let min_y = points.iter().map(|p| p.y).min_by_key(|&y| y).unwrap();

    let mut area = 0;

    for x in min_x..max_x {
        for y in min_y..max_y {
            let p = Point { x, y };
            let total_distance = points.iter()
                .map(|point| point.distance_to(&p))
                .fold(0, |acc, val| acc + val);

            if total_distance < max_distance {
                area += 1;
            }
        }
    }

    area as i32
}

fn main() {
    let input = read_input_to_point_array("input.txt");
    println!("The answer to puzzle 1 is {}", puzzle_one(&input));
    println!("The answer to puzzle 2 is {}", puzzle_two(&input));
}
