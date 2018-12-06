
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
        (other.x - self.x + other.y - self.y).abs()
    }

    fn owns_location(&self, location: &Point, other_points: &Vec<Point>) -> bool {
        // TODO
        false
    }

    fn area(&self, other_points: &Vec<Point>) -> Option<i32> {
        let max_dimension = 300i32;
        let off_in_distance = vec![
            Point { x: self.x + max_dimension, y: self.y },
            Point { x: self.x - max_dimension, y: self.y },
            Point { x: self.x, y: self.y + max_dimension },
            Point { x: self.x, y: self.y - max_dimension }
        ];

        let is_infinite = off_in_distance.iter().any(|point| self.owns_location(point, other_points));
        if is_infinite {
            return None
        }

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

fn main() {
    let input = read_input_to_point_array("test_input.txt");
    println!("{:?}", input);
}
