<?php
  error_reporting(E_ALL);
  ini_set('display_errors', 1);
?>

<!DOCTYPE html>
<html>
<head>

    <meta charset='utf-8'>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Expectant Mom's Best Friend</title>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <!-- Include JQuery -->
    <script src="http://code.jquery.com/jquery-1.10.2.js"></script>

    <!-- Add my CSS sheet -->
    <link rel="stylesheet" type="text/css" href="mystyle.css">
    <!-- Add Google Font -->
    <link href='http://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'>
    <!-- Add Favicon -->
    <link rel="shortcut icon" href="images/heart.ico"/>
</head>

<body>

    <div class="container">
        
        <h1>Baby-safe Chemy Check</h1>
        
        <section>
            
            <div>
                <h4 id="safe"></h4>
            </div>

            <div>
                <h4 id="danger"></h4>
                <ul id="danger_list">
                </ul>
            </div>
            
            <div>
                <h4 id="danger_half"></h4>
                <ul id="danger_half_list">
                </ul>
            </div>
            
            <form id="textarea_form">
                <h3>Please paste or type the ingredient names below, seperating them with a comma:</h3>
                <textarea id="chemy_names" name="chemy_names" required="required" placeholder="ie. Water, Glycerin, Butyrospermum Parkii (Shea) Butter..."></textarea>                 
                <div>
                    <p class="normal">You are allowed 1000 characters, you have <span id="textarea_warning">1000</span> characters left.</p>
                </div>
                <input class="submit" name="submit" type="submit" value="submit" />
            </form>

            <h2>OR...</h2>

             <form id="url_form">
                <h3>Please paste or type your sephora product url below:</h3>
                <input id="url" name="url" type="url" required="required" placeholder="ie. http://www.sephora.com/acne-clearing-solution-P385325" />
                <div>
                    <p class="normal">Your URL <span id="url_warning">is pending validation</span>.</p>
                </div>
                <input class="submit" name="submit" type="submit" value="submit" />
            </form>
            
            <p class="disclaimer"><strong>Disclaimer:</strong> Our chemical names' database are not necessarily complete. Please consult your doctor for the safety of any product. Plus, our site is designed to use with sephora and not any other websites.</p>
        
        </section>
    
    </div>
  
    <script src="myscripts.js"></script>
    
</body>
</html>