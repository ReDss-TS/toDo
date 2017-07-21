<?php
header('Content-Type: text/html; charset=utf-8');
class ToDoItem{
    public function __construct(array $arguments = array()) {
        if (!empty($arguments)) {
            foreach ($arguments as $property => $argument) {
                $this->{$property} = $argument;
            }
        }
    }

    public function __call($method, $arguments) {
        $arguments = array_merge(array("ToDoItem" => $this), $arguments); // Note: method argument 0 will always referred to the main class ($this).
        if (isset($this->{$method}) && is_callable($this->{$method})) {
            return call_user_func_array($this->{$method}, $arguments);
        } else {
            throw new Exception("Fatal error: Call to undefined method ToDoItem::{$method}()");
        }
    }
}

//Insert('qwe1', 'qweqweqw');
// Update(7, 'BlaBla', '0987654ewghgfdfghghb');
// Delete(2);
// Select();

function Insert($title)
{
    $link = mysql_connect('localhost', 'admin', 'admin');
    if (!$link) {
     die('Ошибка соединения: ' . mysql_error());
    }
    mysql_select_db('todoitems');
    
    mysql_query("INSERT INTO items VALUES ('','".$title."', '')");
    echo mysql_insert_id();
  
}
if (isset($_POST['callSelect'])) {
        echo Select();
    }   

if (isset($_POST['callInsert'])) {
        echo Insert($_POST['callInsert']);
    }

if (isset($_POST['callUpdate'])) {
        echo Update($_POST['callUpdate'],$_POST['title'],$_POST['r']);
    }    

if (isset($_POST['callDelete'])) {
        echo Delete($_POST['callDelete']);
    }       

function Update($id, $title, $content)
{
    $link = mysql_connect('localhost', 'admin', 'admin');
    if (!$link) {
     die('Ошибка соединения: ' . mysql_error());
    }
    mysql_select_db('todoitems');

    mysql_query("UPDATE items SET Title='".$title."', Container='".$content."' WHERE ID='$id'");  
 
}

function Delete($id)
{
    $conn = new mysqli("localhost", "admin", "admin", "todoitems");
    if ($conn->connect_error) 
    {
        die("Connection failed: " . $conn->connect_error);
        return FALSE;
    }

    $sql = "DELETE FROM items WHERE Id ='".$id."'";

    if ($conn->query($sql) === TRUE) 
        return TRUE;
    else 
        return FALSE;

    $conn->close();    
}

function Select()
{
    $mysqli = mysql_connect("localhost", "admin", "admin");
    $MySQLSelectedDB = mysql_select_db('todoitems', $mysqli);
    $sql = "SELECT * FROM items";
    $result = mysql_query($sql) or die(mysql_error());

    $arr = array();

    while($row = mysql_fetch_assoc($result))
    {
        $obj = new ToDoItem();
        $obj->ID = $row['ID'];
        $obj->Title = $row['Title'];
        $obj->Container = $row['Container'];

        array_push($arr, $obj);
    }

    echo json_encode($arr);
}

?>